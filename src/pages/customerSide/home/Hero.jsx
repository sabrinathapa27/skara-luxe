import React, { useRef } from "react";
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

// GSAP Imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef();

  const features = [
    {
      icon: <PaletteIcon />,
      title: "Authentic Designs",
      description: "Where Integrity Meets Innovation",
    },
    {
      icon: <EmojiEventsIcon />,
      title: "Premium Quality",
      description: "Only the finest fabrics and craftsmanship",
    },
    {
      icon: <LocalShippingIcon />,
      title: "Fast Delivery",
      description: "Quick and secure shipping nationwide",
    },
    {
      icon: <SupportAgentIcon />,
      title: "Customer Service",
      description: "Dedicated support for your needs",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      // 1. Initial Load Animation (Hero Text & Button)
      tl.from(".gsap-hero-title", {
        y: 60,
        opacity: 0,
        delay: 0.2,
      })
        .from(
          ".gsap-hero-sub",
          {
            y: 40,
            opacity: 0,
          },
          "-=0.8",
        )
        .from(
          ".gsap-hero-desc",
          {
            y: 30,
            opacity: 0,
          },
          "-=0.8",
        )
        .from(
          ".gsap-hero-btn",
          {
            scale: 0.9,
            opacity: 0,
          },
          "-=1",
        );

      // 2. Hero Image Parallax (Entrance + Subtle Scale)
      gsap.from(".gsap-hero-img", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // 3. ScrollTrigger for Features Section
      gsap.from(".gsap-feature-card", {
        scrollTrigger: {
          trigger: ".gsap-features-container",
          start: "top 80%", // Starts when the top of the container hits 80% of the viewport
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
      });
    },
    { scope: containerRef },
  );

  const handleShopNow = () => navigate("/collections");

  return (
    <Box ref={containerRef} sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(44, 27, 71, 0.05) 100%)",
          py: 8,
          px: 2,
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Text Content */}
            <Grid size={{xs:12, md:6}}>
              <Typography
                className="gsap-hero-title"
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontFamily: "'Playfair Display', serif",
                  color: "#2C1B47",
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                Timeless Elegance
              </Typography>
              <Typography
                className="gsap-hero-sub"
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Discover our exquisite collection of handcrafted sarees
              </Typography>
              <Typography
                className="gsap-hero-desc"
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                Each saree tells a story of tradition, craftsmanship, and
                luxury. Embrace the beauty of heritage with a modern touch.
              </Typography>
              <Stack direction="row" className="gsap-hero-btn">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleShopNow}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: "50px",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(44, 27, 71, 0.2)",
                  }}
                >
                  Shop Now
                </Button>
              </Stack>
            </Grid>

            {/* Image Placeholder */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                className="gsap-hero-img"
                component="img"
                src="/heroSaree.png"
                sx={{
                  width: "100%",
                  maxWidth: 550,
                  aspectRatio: "4/5",
                  borderRadius: "20px",
                  boxShadow: "30px 30px 60px rgba(0,0,0,0.12)",
                  objectFit: "cover",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        className="gsap-features-container"
        sx={{ py: 10, bgcolor: "white" }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 8,
              fontFamily: "'Playfair Display', serif",
              color: "#2C1B47",
            }}
          >
            Why Choose SkaraLuxe?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{xs:12, md:3}}
                key={index}
                className="gsap-feature-card"
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    textAlign: "center",
                    borderRadius: "15px",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: 45 } })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
