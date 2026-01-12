import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Stack,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Remove,
  ArrowBack,
  ShoppingBag,
  Add,
  Delete,
} from "@mui/icons-material";
import { useCart } from "../../../context/CartContext";
import { useNotification } from "../../../context/NotificationContext";
import CustomDialog from "../../../components/custom/CustomDialog";

const Cart = () => {
  const theme = useTheme();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  // State for dialogs
  const [removeDialog, setRemoveDialog] = useState({
    open: false,
    item: null,
  });

  const [clearCartDialog, setClearCartDialog] = useState({
    open: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuantityChange = (item, type) => {
    if (type === "increase") {
      updateQuantity(
        item.id,
        item.selectedSize,
        item.selectedColor,
        item.quantity + 1
      );
    } else if (type === "decrease" && item.quantity > 1) {
      updateQuantity(
        item.id,
        item.selectedSize,
        item.selectedColor,
        item.quantity - 1
      );
    } else if (type === "decrease" && item.quantity === 1) {
      // Open remove dialog when quantity would be 0
      setRemoveDialog({
        open: true,
        item: item,
      });
    }
  };

  const handleRemoveClick = (item) => {
    setRemoveDialog({
      open: true,
      item: item,
    });
  };

  const handleConfirmRemove = () => {
    if (removeDialog.item) {
      removeFromCart(
        removeDialog.item.id,
        removeDialog.item.selectedSize,
        removeDialog.item.selectedColor
      );
      showNotification(
        `${removeDialog.item.name} removed from cart`,
        "info" // or "remove", "trash" based on your notification system
      );
      setRemoveDialog({ open: false, item: null });
    }
  };

  const handleClearCartClick = () => {
    setClearCartDialog({ open: true });
  };

  const handleConfirmClearCart = () => {
    clearCart();
    showNotification("All items removed from cart", "info");
    setClearCartDialog({ open: false });
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      showNotification("Your cart is empty!", "error");
      return;
    }
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/collections");
  };

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2, 
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 4, md: 8 },
            width: "100%",
            maxWidth: 500,
            px: { xs: 2, md:3 },
          }}
        >
          <ShoppingBag
            sx={{
              fontSize: { xs: 60, md: 80 },
              color: theme.palette.grey[400],
              mb: { xs: 2, md:3},
            }}
          />
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 1.5, sm: 2 },
              color: theme.palette.primary.dark,
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            Your Cart is Empty
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.5,
            }}
          >
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            sx={{
              backgroundColor: theme.palette.primary.main,
              px: { xs: 3, sm: 4 }, // Equal padding on both sides
              py: 1.5,
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: "100%", sm: "none" },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ width: "100vw", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, width: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  color: theme.palette.primary.dark,
                }}
              >
                Shopping Cart
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  ml: "auto",
                }}
              >
                {getCartCount()} items
              </Typography>
            </Stack>
          </Box>

          <Grid container spacing={4} sx={{ width: "100%", margin: 0 }}>
            {/* Left Column - Cart Items */}
            <Grid
              size={{ xs: 12, md: 8 }}
              sx={{ width: "100%", paddingRight: { md: 2 } }}
            >
              <Stack spacing={3} sx={{ width: "100%" }}>
                {cartItems.map((item) => (
                  <Card
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: theme.shadows[1],
                      "&:hover": { boxShadow: theme.shadows[3] },
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: { xs: "100%", md: 200 },
                        height: 200,
                        minWidth: { md: 200 },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    {/* Product Details */}
                    <CardContent
                      sx={{
                        flex: 1,
                        p: 3,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ flex: 1, mr: { md: 2 } }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "'Playfair Display', serif",
                              mb: 1,
                            }}
                          >
                            {item.name}
                          </Typography>

                          {/* Size and Color */}
                          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            {item.selectedSize && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Size: <strong>{item.selectedSize}</strong>
                              </Typography>
                            )}
                            {item.selectedColor && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Color: <strong>{item.selectedColor}</strong>
                              </Typography>
                            )}
                          </Stack>

                          {/* Quantity Controls */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item, "decrease")
                              }
                              sx={{
                                border: `1px solid ${theme.palette.grey[400]}`,
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              size="small"
                              sx={{ width: 60, textAlign: "center" }}
                              inputProps={{
                                style: { textAlign: "center" },
                                readOnly: true,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item, "increase")
                              }
                              sx={{
                                border: `1px solid ${theme.palette.grey[400]}`,
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "flex-start", md: "flex-end" },
                            justifyContent: "space-between",
                            mt: { xs: 2, md: 0 },
                          }}
                        >
                          {/* Price */}
                          <Box sx={{ textAlign: { md: "right" } }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: theme.palette.primary.dark,
                                fontWeight: 700,
                              }}
                            >
                              {formatCurrency(item.price * item.quantity)}
                            </Typography>
                            {item.quantity > 1 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {formatCurrency(item.price)} each
                              </Typography>
                            )}
                          </Box>

                          {/* Remove Button */}
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveClick(item)}
                            sx={{
                              color: theme.palette.error.main,
                              alignSelf: { xs: "flex-start", md: "flex-end" },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                {/* Clear Cart Button */}
                <Box sx={{ textAlign: "left", width: "100%" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCartClick}
                    startIcon={<Delete />}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Stack>
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ width: "100%" }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  position: "sticky",
                  top: 20,
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    color: theme.palette.primary.dark,
                  }}
                >
                 (Note: Delivery is free for orders above NPR 15,000)
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                  }}
                >
                  Order Summary
                </Typography>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                      Subtotal ({getCartCount()} items)
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {formatCurrency(getCartTotal())}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                      Shipping
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {getCartTotal() > 15000 ? "FREE" : formatCurrency(200)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                      Tax (13% VAT)
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {formatCurrency(getCartTotal() * 0.13)}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      {formatCurrency(
                        getCartTotal() +
                          getCartTotal() * 0.13 +
                          (getCartTotal() > 5000 ? 0 : 200)
                      )}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Promo Code */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Have a promo code?
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter promo code"
                      sx={{ backgroundColor: "white" }}
                    />
                    <Button variant="outlined" size="small">
                      Apply
                    </Button>
                  </Stack>
                </Box>

                {/* Checkout Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleProceedToCheckout}
                  sx={{
                    py: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleContinueShopping}
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Remove Item Dialog */}
      <CustomDialog
        open={removeDialog.open}
        title="Remove Item"
        content={`Are you sure you want to remove "${removeDialog.item?.name}" from your cart?`}
        onConfirm={handleConfirmRemove}
        onCancel={() => setRemoveDialog({ open: false, item: null })}
        type="error"
        confirmText="Remove"
        cancelText="Keep Item"
      />

      {/* Clear Cart Dialog */}
      <CustomDialog
        open={clearCartDialog.open}
        title="Clear Cart"
        content={`Are you sure you want to remove all items from your cart?`}
        onConfirm={handleConfirmClearCart}
        onCancel={() => setClearCartDialog({ open: false })}
        type="error"
        confirmText="Clear Cart"
        cancelText="Cancel"
      />
    </>
  );
};

export default Cart;
