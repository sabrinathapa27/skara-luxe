import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { allProducts } from "../../../helper/AllProducts";
import CustomImagePreview from "../../../components/custom/CustomImagePreview";

const Collections = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleShowAllProducts = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  const handleImageClick = (imageUrl, productName) => {
    setPreviewImage(imageUrl);
    setPreviewTitle(productName);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setPreviewImage("");
    setPreviewTitle("");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: theme.palette.grey[50] }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: theme.palette.primary.dark,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            All Collections
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            Explore our premium collection of traditional and contemporary
            sarees
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products by name, description, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              maxWidth: 500,
              backgroundColor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Active Filters Display */}
        {(selectedCategory !== "all" || searchQuery) && (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
            </Stack>
          </Box>
        )}

        {/* Category Chips for quick filtering */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Chip
            label="All"
            clickable
            color={selectedCategory === "all" ? "primary" : "default"}
            onClick={() => setSelectedCategory("all")}
            sx={{ fontWeight: 500 }}
          />
          {categories
            .filter((cat) => cat !== "all")
            .map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={selectedCategory === category ? "primary" : "default"}
                onClick={() => setSelectedCategory(category)}
                sx={{ fontWeight: 500 }}
              />
            ))}
        </Stack>

        {/* Grid Layout for Products */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <SearchIcon
              sx={{ fontSize: 60, color: theme.palette.grey[400], mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery
                ? `No products matching "${searchQuery}"`
                : `No products in "${selectedCategory}" category`}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleShowAllProducts}
              sx={{ mt: 2 }}
            >
              Show All Products
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        pt: "100%",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover img": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => handleImageClick(product.image, product.name)}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      {product.isNew && (
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          fontWeight: 500,
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          mb: 1,
                          minHeight: "3rem",
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({product.reviewCount})
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, flexGrow: 1 }}
                      >
                        {product.description}
                      </Typography>

                      {/* Price & Button */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.dark,
                              fontWeight: 700,
                            }}
                          >
                            {formatCurrency(product.price)}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {formatCurrency(product.originalPrice)}
                          </Typography>
                        </Box>

                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/product/${product.id}`)}
                          sx={{ backgroundColor: theme.palette.primary.main }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Show Count and Active Filter */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {(() => {
                  if (selectedCategory === "all" && !searchQuery) {
                    return `Showing all ${filteredProducts.length} products`;
                  } else if (selectedCategory !== "all" && !searchQuery) {
                    return `Showing ${filteredProducts.length} products in "${selectedCategory}" category`;
                  } else if (selectedCategory === "all" && searchQuery) {
                    return `Found ${filteredProducts.length} products matching "${searchQuery}"`;
                  } else {
                    return `Found ${filteredProducts.length} products matching "${searchQuery}" in "${selectedCategory}" category`;
                  }
                })()}
              </Typography>
              {(selectedCategory !== "all" || searchQuery) && (
                <Button
                  variant="text"
                  size="small"
                  onClick={handleShowAllProducts}
                  sx={{ mt: 1 }}
                >
                 Show All Products
                </Button>
              )}
            </Box>
          </>
        )}

        {/* Image Preview Dialog */}
        <CustomImagePreview
          open={previewOpen}
          imageUrl={previewImage}
          title={previewTitle}
          onClose={handlePreviewClose}
        />
      </Container>
    </Box>
  );
};

export default Collections;
