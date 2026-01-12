import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Rating,
  Chip,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../../../helper/AllProducts";
import CustomImagePreview from "../../../components/custom/CustomImagePreview";

const trendingProducts = allProducts.filter(
  (product) => product.id >= 1 && product.id <= 7
);

const Trending = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const cardRefs = useRef([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const performScroll = (index) => {
    if (scrollContainerRef.current && cardRefs.current[index]) {
      const card = cardRefs.current[index];
      const container = scrollContainerRef.current;

      container.scrollTo({
        left: card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (autoScroll) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex =
            prevIndex >= trendingProducts.length - 1 ? 0 : prevIndex + 1;
          setTimeout(() => performScroll(nextIndex), 100);
          return nextIndex;
        });
      }, 3000);
      return () => clearInterval(autoScrollIntervalRef.current);
    }
  }, [autoScroll]);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    performScroll(index);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 5000);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(trendingProducts.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleImageClick = (image, name) => {
    setPreviewImage(image);
    setPreviewTitle(name);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setPreviewImage("");
    setPreviewTitle("");
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: theme.palette.grey[50] }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: theme.palette.primary.dark,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
           New Arrivals
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              sx={{ backgroundColor: "white", boxShadow: 1 }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentIndex >= trendingProducts.length - 1}
              sx={{ backgroundColor: "white", boxShadow: 1 }}
            >
              <ChevronRight />
            </IconButton>
          </Stack>
        </Box>

        {/* Horizontal Scroll Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            gap: 3,
            pb: 4,
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory", // Makes scrolling "snap" to cards
          }}
        >
          {trendingProducts.map((product, index) => (
            <Card
              key={product.id}
              ref={(el) => (cardRefs.current[index] = el)}
              sx={{
                width: {
                  xs: "calc(100vw - 48px)",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                  lg: "calc(25% - 18px)",
                },
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                scrollSnapAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-8px)" },
              }}
              onMouseEnter={() => setAutoScroll(false)}
              onMouseLeave={() => setAutoScroll(true)}
            >
              {/* Product Image Wrapper - FIXES THE TOP GAP */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  pt: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
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

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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

                {/* Price & Button - MOVED TO BOTTOM */}
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
                    sx={{ backgroundColor: theme.palette.primary.main }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Indicators */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {trendingProducts.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => scrollToIndex(idx)}
              sx={{
                width: currentIndex === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                mx: 0.5,
                cursor: "pointer",
                backgroundColor:
                  currentIndex === idx
                    ? theme.palette.primary.main
                    : theme.palette.grey[300],
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
        <Button
          variant="text"
          sx={{ mt: 4, display: "block", mx: "auto", fontWeight: 600 }}
          onClick={() => navigate("/collections")}
        >
          Explore More Products
        </Button>
      </Container>

      <CustomImagePreview
        open={previewOpen}
        imageUrl={previewImage}
        onClose={handlePreviewClose}
        title={previewTitle}
      />
    </Box>
  );
};

export default Trending;
