// Checkout.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Stepper, Step, StepLabel } from "@mui/material";
import CartReview from "./CartReview";
import ShippingDetails from "./ShippingDetails";
import PaymentComponent from "./Payment";
import Confirmation from "./Confirmation";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../../context/CartContext";


const Checkout = () => {
  const steps = ["Cart Review", "Shipping Details", "Payment", "Confirmation"];
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { cartItems, getCartTotal, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    addressType: "home",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: "cod",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  // Calculate order summary - memoized to prevent unnecessary calculations
  useEffect(() => {
    const calculateOrderSummary = () => {
      const subtotal = getCartTotal();
      const shipping = subtotal > 15000 ? 0 : 200;
      const tax = subtotal * 0.13;
      const total = subtotal + shipping + tax;

      setOrderSummary({
        subtotal,
        shipping,
        tax,
        total,
      });
    };

    calculateOrderSummary();
  }, [cartItems, getCartTotal]);

  // Simple save to localStorage for checkout data
  const saveCheckoutData = () => {
    const checkoutData = {
      shippingInfo,
      paymentInfo,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("saree_checkout_data", JSON.stringify(checkoutData));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (
        !shippingInfo.firstName ||
        !shippingInfo.lastName ||
        !shippingInfo.email ||
        !shippingInfo.phone ||
        !shippingInfo.address ||
        !shippingInfo.addressType
      ) {
        alert("Please fill in all required shipping details");
        return;
      }
    }

    if (activeStep === 2) {
      if (
        paymentInfo.method === "card" &&
        (!paymentInfo.cardNumber || !paymentInfo.cardName)
      ) {
        alert("Please fill in all required payment details");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
    saveCheckoutData();
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = {
        orderId: `ORD${Date.now()}`,
        items: cartItems,
        shippingInfo,
        paymentInfo,
        orderSummary,
        orderDate: new Date().toISOString(),
      };

      // Save order history
      const existingOrders = JSON.parse(
        localStorage.getItem("saree_orders") || "[]"
      );
      existingOrders.push(orderData);
      localStorage.setItem("saree_orders", JSON.stringify(existingOrders));

      // Clear cart and checkout data
      clearCart();
      localStorage.removeItem("saree_checkout_data");

      setOrderPlaced(true);
      setActiveStep(3);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CartReview />;
      case 1:
        return (
          <ShippingDetails
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
          />
        );
      case 2:
        return (
          <PaymentComponent
            paymentInfo={paymentInfo}
            handlePaymentChange={handlePaymentChange}
          />
        );
      case 3:
        return (
          <Confirmation
            orderPlaced={orderPlaced}
            loading={loading}
            shippingInfo={shippingInfo}
            handlePlaceOrder={handlePlaceOrder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          mb: 4,
          maxWidth: { xs: "100%", md: "90%", lg: "1200px" },
          mx: "auto",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: { xs: "100%", md: "90%", lg: "1200px" },
          mx: "auto",
        }}
      >
        <Grid size={{ xs: 12, md: cartItems.length === 0 || (orderPlaced && activeStep === 3) ? 12 : 8 }}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            {renderStepContent()}
          </Paper>
        </Grid>

        {cartItems.length > 0 && !(orderPlaced && activeStep === 3) && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <OrderSummary
                orderSummary={orderSummary}
                cartItems={cartItems}
                activeStep={activeStep}
                steps={steps}
                loading={loading}
                handleNext={handleNext}
                handleBack={handleBack}
                handlePlaceOrder={handlePlaceOrder}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Checkout;
