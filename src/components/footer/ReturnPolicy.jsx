import React, { useEffect } from "react";
import { Typography, Container, Box, Divider, Paper } from "@mui/material";

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "white" }}>
      <Container maxWidth={false} disableGutters sx={{ width: "100%" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            border: "none",
            width: "100%",
          }}
        >
          {/* Header Section */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "#2C1B47",
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
            }}
          >
            Return Policy
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#6B7280",
              textAlign: "center",
              mb: 8,
              fontWeight: 400,
            }}
          >
            We want you to be completely satisfied with your Skara-Luxe
            purchase.
          </Typography>

          <Divider sx={{ mb: 2 }} />
          {/* Section */}
          <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Eligibility */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#2C1B47", mb: 3 }}
              >
                1. Eligibility for Returns
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{ color: "#4B5563", lineHeight: 2, fontSize: "1.1rem" }}
              >
                <ul>
                  <li>
                    <strong>Timeframe:</strong> You may return your item within
                    7 days of receipt for a full refund.
                  </li>
                  <li>
                    <strong>Condition:</strong> Items must be unused, in
                    original packaging, and in the same condition as received.
                  </li>
                  <li>
                    <strong>Proof of Purchase:</strong> Please provide a receipt
                    or order confirmation with your request.
                  </li>
                </ul>
              </Typography>
            </Box>

            {/*  How to Return */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#2C1B47", mb: 3 }}
              >
                2. How to Initiate a Return
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#4B5563", mb: 3, fontSize: "1.1rem" }}
              >
                Contact our customer service team at{" "}
                <strong>support@skara-luxe.com</strong>. Please include your
                order number, reason for return, and photos of the item if
                applicable.
              </Typography>
              <Box
                sx={{
                  bgcolor: "#FDF2F8",
                  p: 3,
                  borderRadius: 2,
                  borderLeft: "6px solid #F06292",
                }}
              >
                <Typography variant="body1" sx={{ color: "#2C1B47" }}>
                  <strong>Note:</strong> Our team will provide a return
                  authorization and detailed shipping instructions.
                </Typography>
              </Box>
            </Box>

            {/* Refunds */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#2C1B47", mb: 3 }}
              >
                3. Refunds & Processing
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#4B5563", lineHeight: 2, fontSize: "1.1rem" }}
              >
                Once we receive your returned item, we will process your refund
                within <strong>5-7 business days</strong>. Refunds are issued to
                the original payment method.
              </Typography>
            </Box>

            {/* Contact */}
            <Box
              sx={{
                mt: 10,
                p: 6,
                bgcolor: "#F9FAFB",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#2C1B47",
                  mb: 2,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Need Assistance?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6B7280", fontSize: "1.1rem" }}
              >
                Email: <strong>support@skara-luxe.com</strong> <br />
                Call: <strong>+977-9812770873</strong>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReturnPolicy;
