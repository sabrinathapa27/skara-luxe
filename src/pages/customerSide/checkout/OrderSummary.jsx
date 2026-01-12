// OrderSummary.jsx
import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const OrderSummary = ({
  orderSummary,
  cartItems,
  activeStep,
  steps,
  loading,
  handleNext,
  handleBack,
  handlePlaceOrder,
}) => {
  console.log("OrderSummary - cartItems:", cartItems); // Debug log
  console.log("OrderSummary - orderSummary:", orderSummary); // Debug log

  return (
    <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <ShoppingCartIcon /> Order Summary
      </Typography>

      {/* Debug info - remove in production */}
      {cartItems.length === 0 && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          No items in cart
        </Typography>
      )}

      <List>
        <ListItem>
          <ListItemText primary="Subtotal" />
          <Typography>Rs {orderSummary.subtotal.toFixed(2)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Shipping" />
          <Typography>
            {orderSummary.shipping === 0 ? (
              <Chip label="FREE" size="small" color="success" />
            ) : (
              `Rs ${orderSummary.shipping.toFixed(2)}`
            )}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Tax (13%)" />
          <Typography>Rs {orderSummary.tax.toFixed(2)}</Typography>
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem>
          <ListItemText primary={<Typography variant="h6">Total</Typography>} />
          <Typography variant="h6" color="primary">
            Rs{orderSummary.total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      {cartItems.length > 0 && activeStep < 3 && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleNext}
          sx={{ mt: 2 }}
        >
          {activeStep === steps.length - 2
            ? "Place Order"
            : "Continue to Next Step"}
        </Button>
      )}

      {activeStep === 2 && cartItems.length > 0 && (
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handlePlaceOrder}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Place Order"}
        </Button>
      )}

      {activeStep > 0 && activeStep < 3 && (
        <Button
          fullWidth
          variant="outlined"
          onClick={handleBack}
          sx={{ mt: 1 }}
        >
          Back
        </Button>
      )}
    </Paper>
  );
};

export default OrderSummary;
