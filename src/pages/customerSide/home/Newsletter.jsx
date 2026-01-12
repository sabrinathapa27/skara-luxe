// SimpleNewsletter.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  useTheme,
  useMediaQuery,
  InputLabel,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribed email:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <Box
      sx={{
        py: 8,
        background: theme.palette.primary.light,
        backgroundSize: "300px 300px",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(233, 30, 99, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "#9c27b0",
                mb: 1,
              }}
            >
              Stay in the Loop
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Subscribe to get updates on new saree collections, exclusive
              offers, and styling tips.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 500,
              mx: "auto",
            }}
          >
            {subscribed && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for subscribing! Check your email for confirmation.
              </Alert>
            )}

            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 8 }}>
                <InputLabel>Email Address</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "white",
                    },
                  }}
                />
              </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    px: 4,
                    borderRadius: 1,
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    whiteSpace: "nowrap",
                    minWidth: 140,
                  }}
                >
                  Subscribe
                </Button>
                </Grid>
            </Grid>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2, textAlign: "center" }}
            >
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Newsletter;
