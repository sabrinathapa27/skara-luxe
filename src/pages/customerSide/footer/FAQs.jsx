import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized FAQ data for performance
  const faqData = useMemo(
    () => [
      {
        id: "tracking",
        question: "How can I track my order?",
        answer:
          "Once your order is shipped, you will receive an email with a tracking number and a link to track your package in real-time. You can also track your order by logging into your account.",
      },
      {
        id: "returns",
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return policy for unused items in their original packaging with tags attached. Returns are free for damaged or defective items. Please visit our Return Policy page for full details.",
      },
      {
        id: "customization",
        question: "Do you offer customization on sarees?",
        answer:
          "Yes, we offer blouse stitching and fall/pico services. You can select these options on the product page before adding to cart. Customization typically takes 3-5 additional business days.",
      },
      {
        id: "payment",
        question: "Which payment methods are accepted?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and local wallets including eSewa, Khalti, and IME Pay. Cash on delivery is available within Kathmandu Valley.",
      },
      {
        id: "international",
        question: "Is international shipping available?",
        answer:
          "Absolutely. We ship to over 50 countries. Shipping costs are calculated at checkout based on weight and destination. International orders typically arrive within 7-14 business days.",
      },
      {
        id: "sizing",
        question: "How do I know my correct saree size?",
        answer:
          "Our sarees come in standard lengths (5.5m to 6m). For blouse measurements, refer to our comprehensive size guide available on each product page. You can also contact our style consultants for assistance.",
      },
      {
        id: "quality",
        question: "How can I verify the authenticity of your silk sarees?",
        answer:
          "All Skara-Luxe silk sarees come with a certificate of authenticity. You can verify your purchase using the unique QR code on the certificate or contact our customer service with your order number.",
      },
      {
        id: "care",
        question: "How should I care for my silk saree?",
        answer:
          "We recommend dry cleaning for all silk products. For temporary storage, fold neatly and store in a cool, dry place. Avoid exposure to direct sunlight and moisture. Use muslin cloth for long-term storage.",
      },
      {
        id: "delivery",
        question: "What are your delivery timelines?",
        answer:
          "Within Kathmandu: 1-2 business days. Outside Kathmandu: 3-5 business days. International: 7-14 business days. Custom orders may require additional processing time.",
      },
      {
        id: "discounts",
        question: "Do you offer discounts for bulk orders?",
        answer:
          "Yes, we offer special pricing for bulk orders and wedding trousseaus. Please contact our corporate sales team at bulk@skaraluxe.com for custom quotations and special arrangements.",
      },
      {
        id: "account",
        question: "How do I create an account?",
        answer:
          "Click on the 'Sign Up' button in the top navigation, fill in your details, and verify your email. Having an account allows you to track orders, save favorites, and get personalized recommendations.",
      },
      {
        id: "gift",
        question: "Do you offer gift wrapping and messaging?",
        answer:
          "Yes! We offer premium gift wrapping for an additional charge. You can add a personalized gift message during checkout. Gift receipts are included with all wrapped orders.",
      },
    ],
    []
  );

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        py: 2,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "primary.dark",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              mb: 4,
            }}
          >
            Everything you need to know about shopping with Skara-Luxe
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {faqData.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "8px !important",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: "primary.light",
                },
                transition: "all 0.2s ease",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                sx={{
                  "&.Mui-expanded": {
                    minHeight: 48,
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                      color:
                        expanded === faq.id ? "primary.dark" : "text.primary",
                      fontWeight: 600,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: { xs: 3, md: 4 },
            textAlign: "center",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: "primary.dark" }}>
            Still have questions?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
          >
            Our customer support team is here to help you 7 days a week
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Typography variant="body2" color="text.secondary">
              📧 Email: support@skaraluxe.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📞 Phone: +977-1-XXXX-XXXX
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🕒 Hours: 9 AM - 7 PM (Daily)
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQs;
