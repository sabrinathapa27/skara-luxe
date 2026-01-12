// components/checkout/Payment.jsx
import React, { useState, useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const Payment = ({ paymentInfo, setPaymentInfo }) => {
  const CHECKOUT_STORAGE_KEY = "saree_checkout_data";

  // Load saved checkout data
  useEffect(() => {
    loadSavedCheckoutData();
  }, []);

  const loadSavedCheckoutData = () => {
    try {
      const savedData = localStorage.getItem(CHECKOUT_STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.paymentInfo) setPaymentInfo(data.paymentInfo);
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
    }
  };

  // Save checkout data to localStorage
  const saveCheckoutData = () => {
    const checkoutData = {
      paymentInfo,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutData));
  };

  // Handle payment info changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    saveCheckoutData();
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
      >
        <PaymentIcon /> Payment Method
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name="method"
          value={paymentInfo.method}
          onChange={handlePaymentChange}
        >
          <Card
            sx={{
              mb: 2,
              border:
                paymentInfo.method === "cod"
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocalAtmIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">
                        Cash on Delivery
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay when you receive your order
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </CardContent>
          </Card>

          <Card
            sx={{
              mb: 2,
              border:
                paymentInfo.method === "card"
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CreditCardIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">
                        Credit/Debit Card
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay securely with your card
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />

              {paymentInfo.method === "card" && (
                <Box sx={{ mt: 3, pl: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name on Card"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        type="password"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card
            sx={{
              border:
                paymentInfo.method === "bank"
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <AccountBalanceIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1">Bank Transfer</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Transfer directly to our bank account
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </CardContent>
          </Card>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

// Renamed to avoid conflict with MUI icon
export default Payment;
