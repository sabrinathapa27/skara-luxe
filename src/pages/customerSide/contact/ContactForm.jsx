// ContactForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters")
    .required("Message is required"),
});

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted:", values);
    setOpenSnackbar(true);
    resetForm();
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: false,
  });

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: "primary.main",
          mb: 2,
        }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 2 }}
      >
        Have questions about our sarees? We'd love to hear from you.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Name Field */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>Name</InputLabel>
            <TextField
              fullWidth
              id="name"
              name="name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
            />
          </Grid>

          {/* Email Field */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>Email Address</InputLabel>
            <TextField
              fullWidth
              id="email"
              name="email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={formik.isSubmitting}
            />
          </Grid>

          {/* Message Field */}
          <Grid size={{ xs: 12 }}>
            <InputLabel required>Message</InputLabel>
            <TextField
              fullWidth
              id="message"
              name="message"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              disabled={formik.isSubmitting}
              placeholder="Please provide details about your inquiry..."
            />
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={formik.isSubmitting ? null : <SendIcon />}
                disabled={formik.isSubmitting || !formik.isValid}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  minWidth: 200,
                }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ContactForm;
