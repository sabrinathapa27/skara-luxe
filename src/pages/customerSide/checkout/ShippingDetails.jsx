import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  addressType: Yup.string().required("Please select an address type"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
});

const ShippingDetails = ({ shippingInfo, setShippingInfo }) => {
  const CHECKOUT_STORAGE_KEY = "saree_checkout_data";

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      firstName: shippingInfo.firstName || "",
      lastName: shippingInfo.lastName || "",
      email: shippingInfo.email || "",
      phone: shippingInfo.phone || "",
      addressType: shippingInfo.addressType || "home",
      address: shippingInfo.address || "",
    },
    validationSchema,
    onSubmit: (values) => {
      // This won't be used directly since we're saving on change
      // but kept for Formik completeness
      setShippingInfo(values);
      saveCheckoutData(values);
    },
    enableReinitialize: true,
  });

  // Save checkout data to localStorage
  const saveCheckoutData = (values) => {
    const checkoutData = {
      shippingInfo: values,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutData));
  };

  // Load saved checkout data
  useEffect(() => {
    loadSavedCheckoutData();
  }, []);

  const loadSavedCheckoutData = () => {
    try {
      const savedData = localStorage.getItem(CHECKOUT_STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.shippingInfo) {
          // Set Formik values
          formik.setValues(data.shippingInfo);
          // Also update parent state
          setShippingInfo(data.shippingInfo);
        }
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
    }
  };

  // Handle form changes and save to localStorage
  const handleFormChange = (e) => {
    formik.handleChange(e);

    // Update parent state
    const updatedValues = {
      ...formik.values,
      [e.target.name]: e.target.value,
    };
    setShippingInfo(updatedValues);

    // Save to localStorage
    saveCheckoutData(updatedValues);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
      >
        <LocalShippingIcon /> Shipping Information
      </Typography>

      <form>
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>First Name</InputLabel>
            <TextField
              fullWidth
              name="firstName"
              value={formik.values.firstName}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>Last Name</InputLabel>
            <TextField
              fullWidth
              name="lastName"
              value={formik.values.lastName}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              variant="outlined"
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>Email Address</InputLabel>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formik.values.email}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel required>Phone Number</InputLabel>
            <TextField
              fullWidth
              name="phone"
              value={formik.values.phone}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>

          {/* Address Type */}
          <Grid size={{ xs: 12, md:6 }}>
            <FormControl
              component="fieldset"
              error={
                formik.touched.addressType && Boolean(formik.errors.addressType)
              }
            >
              <FormLabel component="legend">Address Type</FormLabel>
              <RadioGroup
                row
                name="addressType"
                value={formik.values.addressType}
                onChange={handleFormChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HomeIcon fontSize="small" /> Home
                    </Box>
                  }
                />
                <FormControlLabel
                  value="office"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WorkIcon fontSize="small" /> Office
                    </Box>
                  }
                />
              </RadioGroup>
              {formik.touched.addressType && formik.errors.addressType && (
                <FormHelperText error>
                  {formik.errors.addressType}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12, md:6 }}>
            <InputLabel required>Full Address</InputLabel>
            <TextField
              fullWidth
              rows={3}
              name="address"
              value={formik.values.address}
              onChange={handleFormChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ShippingDetails;
