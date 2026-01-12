// src/pages/customerSide/productDetails/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  Rating,
  Divider,
  Stack,
  Card,
  CardMedia,
  TextField,
  CardContent,
} from "@mui/material";
import {
  ArrowBack,
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Share,
  Add,
  Remove,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { allProducts } from "../../../helper/AllProducts";
import { useCart } from "../../../context/CartContext";
import { useNotification } from "../../../context/NotificationContext";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const { showNotification } = useNotification();

  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Find the product by ID
    const foundProduct = allProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Set default color if product has colors
    if (foundProduct && foundProduct.colors && foundProduct.colors.length > 0) {
      setSelectedColor(foundProduct.colors[0].name);
    }
  }, [id]);

  // Get how many of this specific product variant are already in cart
  const getItemInCartCount = () => {
    if (!product) return 0;

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    return existingItem ? existingItem.quantity : 0;
  };

  const alreadyInCart = getItemInCartCount();

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Use the addToCart function from your CartContext
    addToCart(product, selectedSize, selectedColor, quantity);

    showNotification(`${quantity} × ${product.name} added to cart`, "success");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart"); // Navigate to cart first, then user can proceed to checkout
  };

  const handleIncreaseQuantity = () => {
    if (!product) return;

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingItem) {
      updateQuantity(
        product.id,
        selectedSize,
        selectedColor,
        existingItem.quantity + 1
      );
      showNotification(`Increased quantity of ${product.name}`, "success");
    } else {
      addToCart(product, selectedSize, selectedColor, 1);
      showNotification(`${product.name} added to cart`, "success");
    }
  };

  const handleDecreaseQuantity = () => {
    if (!product || alreadyInCart <= 0) return;

    if (alreadyInCart === 1) {
      removeFromCart(product.id, selectedSize, selectedColor);
      showNotification(`${product.name} removed from cart`, "info");
    } else {
      updateQuantity(
        product.id,
        selectedSize,
        selectedColor,
        alreadyInCart - 1
      );
      showNotification(`Decreased quantity of ${product.name}`, "success");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Product not found</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/collections")}
        >
          Back to Collections
        </Button>
      </Container>
    );
  }

  const sizes = ["Standard", "Small", "Medium", "Large"];
  const colors = [
    { name: "Red", hex: "#ff0000" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Green", hex: "#00ff00" },
    { name: "Gold", hex: "#ffd700" },
    { name: "Purple", hex: "#800080" },
  ];

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Left Column - Product Images */}
          <Grid size={{xs:12, md:6}}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />

              {/* Product Badges */}
              <Box sx={{ position: "absolute", top: 16, left: 16 }}>
                {product.isNew && (
                  <Chip
                    label="NEW"
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      fontWeight: 600,
                      mr: 1,
                    }}
                  />
                )}
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    mb: 1,
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  {isFavorite ? (
                    <Favorite sx={{ color: theme.palette.primary.main }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  <Share />
                </IconButton>
              </Box>
            </Card>

            {/* Thumbnail Images (Optional) */}
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    border: `2px solid ${theme.palette.grey[300]}`,
                    cursor: "pointer",
                    overflow: "hidden",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <img
                    src={product.image}
                    alt={`Thumbnail ${item}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Right Column - Product Details */}
          <Grid size={{xs:12, md:6}}>
            <Stack spacing={3}>
              {/* Product Title & Rating */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    color: theme.palette.primary.dark,
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="medium"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    {product.rating} ({product.reviewCount} reviews)
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
              </Box>

              {/* Price */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.primary.dark,
                    fontWeight: 700,
                  }}
                >
                  {formatCurrency(product.price)}
                </Typography>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "text.disabled",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatCurrency(product.originalPrice)}
                      </Typography>
                      <Chip
                        label={`Save ${formatCurrency(
                          product.originalPrice - product.price
                        )}`}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.success.light,
                          color: theme.palette.success.dark,
                          fontWeight: 600,
                          mt: 1,
                        }}
                      />
                    </>
                  )}
              </Box>

              <Divider />

              {/* Size Selection */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Select Size
                </Typography>
                <Grid size={{xs:12, md:4}}>
                  <Stack direction="row" spacing={2}>
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          selectedSize === size ? "contained" : "outlined"
                        }
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: 100,
                          borderColor:
                            selectedSize === size
                              ? "transparent"
                              : theme.palette.grey[400],
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Stack>
                </Grid>
              </Box>

              {/* Color Selection */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Select Color
                </Typography>
                <Stack direction="row" spacing={2}>
                  {colors.map((color) => (
                    <Box
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        cursor: "pointer",
                        border: `3px solid ${
                          selectedColor === color.name
                            ? theme.palette.primary.main
                            : "transparent"
                        }`,
                        position: "relative",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {selectedColor === color.name && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            backgroundColor: "white",
                            border: `2px solid ${theme.palette.primary.main}`,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Selected: {selectedColor}
                </Typography>
              </Box>

              {/* Quantity */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quantity
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton
                    onClick={() => handleQuantityChange("decrease")}
                    sx={{ border: `1px solid ${theme.palette.grey[400]}` }}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    size="small"
                    sx={{ width: 80, textAlign: "center" }}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange("increase")}
                    sx={{ border: `1px solid ${theme.palette.grey[400]}` }}
                  >
                    <Add />
                  </IconButton>
                </Stack>

                {/* Show how many are already in cart with controls */}
                {alreadyInCart > 0 && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {alreadyInCart} already in cart
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleIncreaseQuantity}
                    >
                      Add One More
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={handleDecreaseQuantity}
                    >
                      Remove One
                    </Button>
                  </Stack>
                )}
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {alreadyInCart > 0 ? "Add More to Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: "rgba(240, 98, 146, 0.04)",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </Stack>

              {/* Cart Summary */}
              <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cart Summary
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Items in Cart:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {getCartCount()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Cart Total:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(getCartTotal())}
                  </Typography>
                </Stack>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => navigate("/cart")}
                  sx={{ mt: 1 }}
                >
                  View Cart
                </Button>
              </Box>

              {/* Additional Information */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Product Details
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Material:</strong> Pure {product.category} fabric
                  </Typography>
                  <Typography variant="body2">
                    <strong>Care Instructions:</strong> Dry clean only
                  </Typography>
                  <Typography variant="body2">
                    <strong>Country of Origin:</strong> India
                  </Typography>
                  <Typography variant="body2">
                    <strong>Delivery:</strong> 5-7 business days
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Playfair Display', serif",
                color: theme.palette.primary.dark,
                mb: 4,
                textAlign: "center",
              }}
            >
              You Might Also Like
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid key={relatedProduct.id} item xs={6} md={3}>
                  <Card
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-4px)" },
                    }}
                  >
                    <Box sx={{ position: "relative", pt: "100%" }}>
                      <CardMedia
                        component="img"
                        image={relatedProduct.image}
                        alt={relatedProduct.name}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="body1" fontWeight={600}>
                        {relatedProduct.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {formatCurrency(relatedProduct.price)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetails;
