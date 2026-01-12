import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { WhatsApp } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const footerLinks = [
    { label: "Contact Us", path: "/contact" },
    { label: "Shipping Info", path: "/shipping-info" },
    { label: "Returns", path: "/return-policy " },
    { label: "FAQ", path: "/faqs" },
  ];

  return (
    <Box
      sx={{ backgroundColor: "#1A0F2E", color: "#FFFFFF", marginTop: "auto" }}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
              >
                About Skara-Luxe
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.contrastText,
                  lineHeight: 1.8,
                }}
              >
                Discover the elegance of traditional sarees with a modern twist.
                We bring you the finest collection of handcrafted sarees.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {["Collections", "New Arrivals", "Trending", "Sale"].map(
                  (link) => (
                    <Link
                      key={link}
                      href="/"
                      sx={{
                        color: theme.palette.primary.contrastText,
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        transition: "color 250ms ease-in-out",
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      {link}
                    </Link>
                  )
                )}
              </Stack>
            </Grid>

            {/* Customer Service */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
              >
                Customer Service
              </Typography>
              <Stack spacing={1}>
                {footerLinks.map((item) => (
                  <Link
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: theme.palette.primary.contrastText,
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 250ms ease-in-out",
                      "&:hover": {
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Social Links */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
              >
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <Link
                  href="/"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="/"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="/"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  <WhatsApp />
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: "rgba(212, 175, 55, 0.2)", marginY: 3 }} />

        {/* Footer Bottom */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            &copy; {currentYear} Skara-Luxe. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ fontSize: "0.875rem" }}>
            <Link
              href="/"
              sx={{
                color: "#9CA3AF",
                textDecoration: "none",
                "&:hover": { color: "#F06292" },
              }}
            >
              Privacy Policy
            </Link>
            <Typography sx={{ color: "#4B5563" }}>|</Typography>
            <Link
              href="/return-policy"
              sx={{
                color: "#9CA3AF",
                textDecoration: "none",
                "&:hover": { color: "#F06292" },
              }}
            >
              Return Policy
            </Link>
            <Typography sx={{ color: "#4B5563" }}>|</Typography>
            <Link
              href="/"
              sx={{
                color: "#9CA3AF",
                textDecoration: "none",
                "&:hover": { color: "#F06292" },
              }}
            >
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
