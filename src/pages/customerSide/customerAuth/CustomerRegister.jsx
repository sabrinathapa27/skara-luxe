import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  InputLabel,
  Fade,
  Divider,
  useMediaQuery,
  useTheme,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Google,
  Facebook,
} from "@mui/icons-material";

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const CustomerRegister = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    agreeTerms: false,
  };

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate API call delay
    setTimeout(() => {
      console.log("Registration values:", values);

      // Simulate successful registration
      if (values.email && values.password) {
        sessionStorage.setItem("customerEmail", values.email);
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 2% 10%, rgba(248, 187, 208, 0.15) 0%, rgba(255, 255, 255, 1) 50%)",
      }}
    >
      {/* FORM SECTION - Left Half */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? 3 : 4,
          backgroundColor: "white",
          overflowY: "auto",
        }}
      >
        <Fade in timeout={800}>
          <Stack spacing={3} sx={{ width: "100%", maxWidth: 500 }}>
            {/* Header Section */}
            <Stack alignItems="center" spacing={1}>
              <Stack
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "rgba(240, 98, 146, 0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F06292",
                }}
              >
                <Person fontSize="large" />
              </Stack>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: "#2C1B47",
                  textAlign: "center",
                }}
              >
                Join Skara-Luxe
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6B7280", textAlign: "center" }}
              >
                Create your account to explore premium collections
              </Typography>
            </Stack>

            {errorMessage && (
              <Alert severity="error" sx={{ borderRadius: "8px" }}>
                {errorMessage}
              </Alert>
            )}

            {/* Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Stack spacing={2}>
                    {/* Name Fields */}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          First Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="firstName"
                          variant="outlined"
                          placeholder="First name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Last Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="lastName"
                          variant="outlined"
                          placeholder="Last name"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Email Address
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="email"
                          type="email"
                          variant="outlined"
                          placeholder="you@example.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>

                      {/* Phone */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Phone Number
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="phone"
                          type="tel"
                          variant="outlined"
                          placeholder="+91 1234567890"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>

                      {/* Password Fields */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Password
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="password"
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          placeholder="••••••••"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  sx={{ color: "#F06292" }}
                                  size={isMobile ? "small" : "medium"}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Confirm Password
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          variant="outlined"
                          placeholder="••••••••"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.confirmPassword &&
                            Boolean(errors.confirmPassword)
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  edge="end"
                                  sx={{ color: "#F06292" }}
                                  size={isMobile ? "small" : "medium"}
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>

                      {/* Address */}
                      <Grid size={{ xs: 12, md:6}}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          Address
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="address"
                          variant="outlined"
                          placeholder="Full address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel
                          required
                          sx={{ fontWeight: 600, color: "#2C1B47", mb: 0.5 }}
                        >
                          City
                        </InputLabel>
                        <TextField
                          fullWidth
                          name="city"
                          variant="outlined"
                          placeholder="City"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            sx: { borderRadius: "8px" },
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Terms Checkbox */}
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="agreeTerms"
                            checked={values.agreeTerms}
                            onChange={handleChange}
                            sx={{
                              color: "#F06292",
                              "&.Mui-checked": { color: "#F06292" },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: "#6B7280" }}>
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              style={{
                                color: "#F06292",
                                textDecoration: "none",
                              }}
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              style={{
                                color: "#F06292",
                                textDecoration: "none",
                              }}
                            >
                              Privacy Policy
                            </Link>
                          </Typography>
                        }
                      />
                      {touched.agreeTerms && errors.agreeTerms && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#d32f2f",
                            display: "block",
                            mt: 0.5,
                          }}
                        >
                          {errors.agreeTerms}
                        </Typography>
                      )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        size={isMobile ? "medium" : "large"}
                        sx={{
                          bgcolor: "#2C1B47",
                          color: "white",
                          py: isMobile ? 1 : 1.5,
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: isMobile ? "0.95rem" : "1rem",
                          fontWeight: 600,
                          "&:hover": {
                            bgcolor: "#422a63",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(44, 27, 71, 0.2)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {isSubmitting
                          ? "Creating Account..."
                          : "Create Account"}
                      </Button>
                    </Grid>
                  </Stack>
                </Form>
              )}
            </Formik>

            <Divider>
              <Typography
                variant="caption"
                sx={{
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Or Sign Up With
              </Typography>
            </Divider>

            {/* Social Sign Up Buttons */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    py: isMobile ? 1 : 1.2,
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "#F06292",
                      backgroundColor: "rgba(240, 98, 146, 0.04)",
                    },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    py: isMobile ? 1 : 1.2,
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "#F06292",
                      backgroundColor: "rgba(240, 98, 146, 0.04)",
                    },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>

            {/* Login Link */}
            <Grid container justifyContent="center">
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", textAlign: "center" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#F06292",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Fade>
      </Grid>

      {/* IMAGE SECTION - Right Half (Desktop only) */}
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "linear-gradient(135deg, #F8BBD0 0%, #F06292 100%)",
          padding: 6,
          minHeight: "100vh",
        }}
      >
        {/* Decorative elements */}
        <Stack
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            filter: "blur(20px)",
          }}
        />
        <Stack
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            filter: "blur(30px)",
          }}
        />

        {/* Logo */}
        <Stack
          component="img"
          src="/logo.png"
          alt="Skara-Luxe Logo"
          onError={(e) => {
            e.target.style.display = "none";
          }}
          sx={{
            width: "60%",
            maxWidth: "300px",
            zIndex: 2,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        <Stack sx={{ mt: 4, textAlign: "center", zIndex: 2, color: "white" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
            }}
          >
            Welcome to Luxury
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 1, maxWidth: "280px" }}
          >
            Join our exclusive community and discover premium collections
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CustomerRegister;
