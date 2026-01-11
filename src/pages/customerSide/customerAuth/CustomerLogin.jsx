import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  InputLabel,
  Fade,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Google,
  Facebook,
} from "@mui/icons-material";

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CustomerLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = { email: "", password: "", rememberMe: false };

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      console.log("Login values:", values);

      if (values.email && values.password) {
        sessionStorage.setItem("customerEmail", values.email);
        alert("Login successful!");
        navigate("/");
      } else {
        setErrorMessage("Invalid credentials");
      }

      setIsSubmitting(false);
    }, 1000);
  };

  const renderFormContent = () => (
    <Fade in timeout={800}>
      <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
        {/* Header Section */}
        <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              bgcolor: "rgba(240, 98, 146, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F06292",
              mb: 1,
            }}
          >
            <LockOutlined fontSize="large" />
          </Box>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#2C1B47",
              mb: 1,
              textAlign: "center",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#6B7280", textAlign: "center" }}
          >
            Please enter your details to sign in.
          </Typography>
        </Stack>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
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
              <Stack spacing={3}>
                {/* Email Field */}
                <Box>
                  <InputLabel
                    required
                    sx={{
                      fontWeight: 600,
                      color: "#2C1B47",
                      mb: 1,
                    }}
                  >
                    Email Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    variant="outlined"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    size={isMobile ? "small" : "medium"}
                    InputProps={{
                      sx: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box>
                  <InputLabel
                    required
                    sx={{
                      fontWeight: 600,
                      color: "#2C1B47",
                      mb: 1,
                    }}
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
                              <VisibilityOff
                                fontSize={isMobile ? "small" : "medium"}
                              />
                            ) : (
                              <Visibility
                                fontSize={isMobile ? "small" : "medium"}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Box>

                {/* Remember Me & Forgot Password */}
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        style={{
                          marginRight: "8px",
                          accentColor: "#F06292",
                        }}
                      />
                      <Typography variant="body2">Remember me</Typography>
                    </label>
                    <Link
                      to="/forgot-password"
                      style={{
                        color: "#F06292",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Stack>
                </Box>

                {/* Submit Button */}
                <Box>
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
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>

        <Divider sx={{ my: 4 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Or Login With
          </Typography>
        </Divider>

        {/* Social Login Buttons */}
        <Stack direction="row" spacing={2}>
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
        </Stack>

        {/* Sign Up Link */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", textAlign: "center" }}
          >
            New to Skara-Luxe?{" "}
            <Link
              to="/register"
              style={{
                color: "#F06292",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Fade>
  );

  // Image section (only for desktop)
  const renderImageSection = () => (
    <Box
      sx={{
        width: "50%",
        minHeight: "100vh",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "linear-gradient(135deg, #F8BBD0 0%, #F06292 100%)",
        padding: 6,
      }}
    >
      {/* Decorative elements */}
      <Box
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
      <Box
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
      <Box
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

      <Box sx={{ mt: 4, textAlign: "center", zIndex: 2, color: "white" }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
          }}
        >
          Elevate Your Style
        </Typography>
        <Typography
          variant="body2"
          sx={{ opacity: 0.9, mt: 1, maxWidth: "280px" }}
        >
          Experience the finest collection of luxury curated just for you.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "radial-gradient(circle at 2% 10%, rgba(248, 187, 208, 0.15) 0%, rgba(255, 255, 255, 1) 50%)",
      }}
    >
      {/* MOBILE VIEW */}
      {isMobile ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            backgroundColor: "white",
          }}
        >
          {renderFormContent()}
        </Box>
      ) : (
        /* DESKTOP VIEW */
        <>
          {/* FORM SECTION - Left Half */}
          <Box
            sx={{
              width: "50%",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              backgroundColor: "white",
            }}
          >
            {renderFormContent()}
          </Box>

          {/* IMAGE SECTION - Right Half */}
          {renderImageSection()}
        </>
      )}
    </Box>
  );
};

export default CustomerLogin;
