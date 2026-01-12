// CartReview.jsx
import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../../context/CartContext";

const CartReview = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };


  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(item);
      return;
    }

    updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
      >
        <ShoppingCartIcon /> Your Cart ({cartItems.length} items)
      </Typography>

      {cartItems.length === 0 ? (
        <Alert severity="info">
          Your cart is empty. Please add items to proceed with checkout.
        </Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={item.image || "/placeholder-saree.jpg"}
                        alt={item.name}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && " | "}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>Rs{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        sx={{ minWidth: 30 }}
                      >
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        sx={{ minWidth: 30 }}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    Rs{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveItem(item)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CartReview;
