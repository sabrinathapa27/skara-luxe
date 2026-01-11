import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaletteIcon from "@mui/icons-material/Palette";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const features = [
    {
      icon: (
        <PaletteIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Authentic Designs",
      description: "Where Integrity Meets Innovation",
    },
    {
      icon: (
        <EmojiEventsIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Premium Quality",
      description: "Only the finest fabrics and craftsmanship",
    },
    {
      icon: (
        <LocalShippingIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Fast Delivery",
      description: "Quick and secure shipping nationwide",
    },
    {
      icon: (
        <SupportAgentIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Customer Service",
      description: "Dedicated support for your needs",
    },
  ];

  const handleShopNow = () => {
    navigate("/collections");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(44, 27, 71, 0.05) 100%)",
          py: 8,
          px: 2,
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Text Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  fontFamily: "'Playfair Display', serif",
                  color: "#2C1B47",
                  marginBottom: 2,
                }}
              >
                Timeless Elegance
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.primary,
                  marginBottom: 2,
                  fontWeight: 600,
                }}
              >
                Discover our exquisite collection of handcrafted sarees
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  marginBottom: 3,
                  lineHeight: 1.8,
                  fontSize: "1.125rem",
                }}
              >
                Each saree tells a story of tradition, craftsmanship, and
                luxury. Embrace the beauty of heritage with a modern touch.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ marginTop: 3 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#FFFFFF",
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  onClick={handleShopNow}
                >
                  Shop Now
                </Button>
                {/* <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "#2C1B47",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick ={handleViewCollections}
                >
                  View Collections
                </Button> */}
              </Stack>
            </Grid>

            {/* Image Placeholder */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src="/heroSaree.png"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  aspectRatio: "4/5",
                  borderRadius: 3,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth={false}
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 6,
            lg: 12,
          },
          py: { xs: 4, md: 6 },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              textAlign: "center",
              width: "100%",
              marginBottom: { xs: 3, md: 4 },
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2rem",
              },
              px: { xs: 1, sm: 0 },
            }}
          >
            Why Choose SkaraLuxe?
          </Typography>

          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                sx={{
                  padding: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                  },
                  height: "100%",
                  textAlign: "center",
                  transition: "all 250ms ease-in-out",
                  backgroundColor: "background.paper",
                  cursor: "pointer",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-4px)" },
                    boxShadow: {
                      xs: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    },
                    backgroundColor: theme.palette.primary.light,
                    "& .feature-icon": {
                      color: theme.palette.primary.dark,
                    },
                    "& .feature-title": {
                      color: theme.palette.primary.dark,
                    },
                    "& .feature-description": {
                      color: theme.palette.primary.dark,
                    },
                  },
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    marginBottom: { xs: 1.5, md: 2 },
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className="feature-icon"
                >
                  {React.cloneElement(feature.icon, {
                    sx: {
                      fontSize: {
                        xs: 32,
                        sm: 36,
                        md: 40,
                      },
                    },
                  })}
                </Box>
                <Typography
                  variant="h6"
                  className="feature-title"
                  sx={{
                    color: "#2C1B47",
                    marginBottom: { xs: 0.5, md: 1 },
                    fontFamily: "'Playfair Display', serif",
                    transition: "color 250ms ease-in-out",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.125rem",
                      md: "1.25rem",
                    },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="feature-description"
                  sx={{
                    color: "#6B7280",
                    transition: "color 250ms ease-in-out",
                    fontSize: {
                      xs: "0.8125rem",
                      sm: "0.875rem",
                      md: "0.9375rem",
                    },
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
