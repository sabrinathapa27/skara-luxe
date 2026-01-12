import React, { useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import InventoryIcon from "@mui/icons-material/Inventory";

const ShippingInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shippingFeatures = useMemo(
    () => [
      {
        icon: (
          <TimerIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        ),
        title: "Processing Time",
        desc: "Every Skara-Luxe piece undergoes a quality check. Orders are dispatched within 1-2 business days.",
        key: "processing",
      },
      {
        icon: (
          <LocalShippingIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        ),
        title: "Domestic Shipping",
        desc: "Reliable delivery across the country within 3-5 business days via our premium courier partners.",
        key: "domestic",
      },
      {
        icon: (
          <PublicIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        ),
        title: "International Delivery",
        desc: "Global shipping available. Arrives within 7-14 business days depending on customs and location.",
        key: "international",
      },
      {
        icon: (
          <InventoryIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        ),
        title: "Packaging",
        desc: "All items are shipped in signature luxury packaging to ensure they arrive in pristine condition.",
        key: "packaging",
      },
    ],
    [theme.palette.primary.main]
  );

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.light",
          py: 4,
          textAlign: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "primary.dark",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Shipping & Delivery
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              px: { xs: 2, sm: 0 },
            }}
          >
            How we bring luxury to your doorstep
          </Typography>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {shippingFeatures.map((item) => (
            <Grid size={{ xs: 12 }} key={item.key}>
              <Paper
                component="article"
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ mb: 2 }} aria-hidden="true">
                  {item.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: "primary.dark",
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Promo Banner */}
        <Box
          component="section"
          sx={{
            mt: { xs: 6, md: 8 },
            p: { xs: 3, sm: 4 },
            bgcolor: "primary.dark",
            borderRadius: 3,
            color: "white",
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              mb: 1,
              fontWeight: 700,
            }}
          >
            🚚 Free Shipping Offer
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              opacity: 0.9,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Complimentary standard shipping on all orders over Rs. 15000 within
            Nepal.
          </Typography>
        </Box>

        {/* Additional Info */}
        <Stack
          spacing={3}
          sx={{
            mt: { xs: 6, md: 8 },
            p: { xs: 3, sm: 4 },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "primary.dark",
              fontWeight: 700,
            }}
          >
            Important Information
          </Typography>

          <Stack spacing={2}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 0.5,
                }}
              >
                📦 Tracking Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You will receive tracking details via email and SMS once your
                order is dispatched.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 0.5,
                }}
              >
                🕒 Delivery Hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Deliveries are made Sunday to Saturday between 9 AM to 7 PM. No
                deliveries on public holidays.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 0.5,
                }}
              >
                📞 Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact our customer support team at support@skara-luxe.com or
                call +977-1-XXX-XXXX.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ShippingInfo;
