import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().min(10, 'Phone number must be at least 10 digits').required('Phone number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const CustomerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={6} alignItems="flex-start">
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: 4,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#2C1B47',
                  marginBottom: 1,
                }}
              >
                Create Your Account
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Join Skara-Luxe and discover premium sarees
              </Typography>
            </Box>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                agreeTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Registration attempted with:', values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    margin="normal"
                    size="small"
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    margin="normal"
                    size="small"
                  />

                  <Grid container spacing={2} sx={{ marginY: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                                sx={{ color: '#F06292' }}
                              >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                size="small"
                                sx={{ color: '#F06292' }}
                              >
                                {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    margin="normal"
                    size="small"
                  />

                  <Grid container spacing={2} sx={{ marginY: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pincode && Boolean(errors.pincode)}
                    helperText={touched.pincode && errors.pincode}
                    margin="normal"
                    size="small"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agreeTerms"
                        checked={values.agreeTerms}
                        onChange={handleChange}
                        sx={{
                          color: '#F06292',
                          '&.Mui-checked': {
                            color: '#F06292',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        I agree to the{' '}
                        <Link href="/" sx={{ color: '#F06292', textDecoration: 'none' }}>
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/" sx={{ color: '#F06292', textDecoration: 'none' }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ marginY: 2 }}
                  />
                  {touched.agreeTerms && errors.agreeTerms && (
                    <Typography variant="caption" sx={{ color: '#EF4444', display: 'block', marginTop: -1 }}>
                      {errors.agreeTerms}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#F06292',
                      color: '#FFFFFF',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginY: 3,
                      '&:hover': {
                        backgroundColor: '#EC407A',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Already have an account?{' '}
                <Link
                  href="/login"
                  sx={{
                    color: '#F06292',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#EC407A',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Image Placeholder */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, #5A3A7A 0%, #2C1B47 100%)',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#FFFFFF',
              fontFamily: "'Playfair Display', serif",
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
             Join Our Community 
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerRegister;
