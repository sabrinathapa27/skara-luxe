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

const trendingProducts = [
  {
    id: 1,
    name: "Silk Banarasi Saree",
    description: "Traditional handwoven silk with golden zari work",
    price: 12999,
    originalPrice: 15999,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    category: "Silk",
    image: "/banarasi.png",
  },
  {
    id: 2,
    name: "Chanderi Cotton Saree",
    description: "Lightweight cotton with delicate floral motifs",
    price: 7999,
    originalPrice: 9999,
    rating: 4.5,
    reviewCount: 89,
    isNew: false,
    category: "Cotton",
    image: "/cotton.png",
  },
  {
    id: 3,
    name: "Kanjivaram Silk Saree",
    description: "Rich silk with temple border and intricate designs",
    price: 18999,
    originalPrice: 22999,
    rating: 4.9,
    reviewCount: 156,
    isNew: true,
    category: "Silk",
    image: "/kanjivaram.png",
  },
  {
    id: 4,
    name: "Bandhani Printed Saree",
    description: "Traditional tie-dye art with vibrant colors",
    price: 6599,
    originalPrice: 8499,
    rating: 4.3,
    reviewCount: 67,
    isNew: false,
    category: "Cotton",
    image: "/bandhani.png",
  },
  {
    id: 5,
    name: "Organza Embroidered Saree",
    description: "Modern sheer fabric with sequin embroidery",
    price: 10999,
    originalPrice: 13999,
    rating: 4.6,
    reviewCount: 92,
    isNew: true,
    category: "Organza",
    image: "/organza.png",
  },
  {
    id: 6,
    name: "Tussar Silk Saree",
    description: "Wild silk with natural texture and earthy tones",
    price: 9499,
    originalPrice: 11999,
    rating: 4.4,
    reviewCount: 78,
    isNew: false,
    category: "Silk",
    image: "/tussar.png",
  },
  {
    id: 7,
    name: "Net Embellished Saree",
    description: "Contemporary net fabric with stone and bead work",
    price: 13999,
    originalPrice: 17999,
    rating: 4.7,
    reviewCount: 103,
    isNew: true,
    category: "Net",
    image: "/net.png",
  },
];

const Trending = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const cardRefs = useRef([]);

  const itemsPerView = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  };

  const performScroll = (index) => {
    if (scrollContainerRef.current && cardRefs.current[index]) {
      const card = cardRefs.current[index];
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

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
      }, 2000);

      return () => clearInterval(autoScrollIntervalRef.current);
    }
  }, [autoScroll, trendingProducts.length]);

  // Handle manual scroll
  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    performScroll(index);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 2000);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(trendingProducts.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const getVisibleItemsCount = () => {
    const width = window.innerWidth;
    if (width >= theme.breakpoints.values.lg) return itemsPerView.lg;
    if (width >= theme.breakpoints.values.md) return itemsPerView.md;
    if (width >= theme.breakpoints.values.sm) return itemsPerView.sm;
    return itemsPerView.xs;
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, trendingProducts.length);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const visibleItems = getVisibleItemsCount();

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: theme.palette.grey[50],
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 3, md: 4 },
            px: { xs: 1, sm: 0 },
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
            Trending Products
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              sx={{
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": { backgroundColor: theme.palette.grey[100] },
                "&.Mui-disabled": { opacity: 0.3 },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentIndex >= trendingProducts.length - 1}
              sx={{
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": { backgroundColor: theme.palette.grey[100] },
                "&.Mui-disabled": { opacity: 0.3 },
              }}
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
            pb: 2,
            px: { xs: 1, sm: 0 },
            scrollBehavior: "smooth",
          }}
        >
          {trendingProducts.map((product, index) => (
            <Card
              key={product.id}
              ref={(el) => (cardRefs.current[index] = el)}
              sx={{
                minWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                  lg: "calc(25% - 18px)",
                },
                flexShrink: 0,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: index === currentIndex ? 1 : 0.9,
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 25px -5px ${theme.palette.primary.light}40`,
                  opacity: 1,
                },
              }}
              onMouseEnter={() => {
                setAutoScroll(false);
                clearInterval(autoScrollIntervalRef.current);
              }}
              onMouseLeave={() => {
                setAutoScroll(true);
              }}
            >
              {/* Product Image */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                {product.isNew && (
                  <Chip
                    label="NEW"
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
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    backgroundColor: "white",
                    fontWeight: 500,
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Product Name & Rating */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    minHeight: "2.5rem",
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

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.8125rem", md: "0.875rem" },
                    minHeight: "2.5rem",
                  }}
                >
                  {product.description}
                </Typography>

                {/* Price & Button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                      variant="body2"
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
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Scroll Indicators */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {Array.from({
            length: Math.max(1, trendingProducts.length - visibleItems + 1),
          }).map((_, idx) => (
            <Box
              key={idx}
              onClick={() => scrollToIndex(idx)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                mx: 0.5,
                cursor: "pointer",
                backgroundColor:
                  currentIndex === idx
                    ? theme.palette.primary.main
                    : theme.palette.grey[300],
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Trending;
