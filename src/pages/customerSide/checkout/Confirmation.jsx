// components/checkout/Confirmation.jsx
import React from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const Confirmation = ({ orderPlaced, loading, shippingInfo, handlePlaceOrder }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      {orderPlaced ? (
        <>
          <DoneIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your order. We've sent a confirmation email to{' '}
            {shippingInfo.email}.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Your order will be shipped within 2-3 business days.
          </Typography>
          <Button
            variant="contained"
            onClick={() => (window.location.href = '/')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </>
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 3 }}>
            Please review your order and click "Place Order" to complete your
            purchase.
          </Alert>
          <Button
            variant="contained"
            size="large"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Place Order'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Confirmation;