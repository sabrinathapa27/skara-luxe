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
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={6} alignItems="center">
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: 4,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
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
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Sign in to your Skara-Luxe account
              </Typography>
            </Box>

            <Formik
              initialValues={{ email: '', password: '', rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Login attempted with:', values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
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
                    placeholder="Enter your email"
                    sx={{ marginBottom: 2 }}
                  />

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
                    margin="normal"
                    placeholder="Enter your password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: '#F06292' }}
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ marginBottom: 2 }}
                  />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="rememberMe"
                          checked={values.rememberMe}
                          onChange={handleChange}
                          sx={{
                            color: '#F06292',
                            '&.Mui-checked': {
                              color: '#F06292',
                            },
                          }}
                        />
                      }
                      label="Remember me"
                    />
                    <Link
                      href="/"
                      sx={{
                        color: '#F06292',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#EC407A',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Stack>

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
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Or continue with
              </Typography>
            </Divider>

            <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: '#D1D5DB',
                  color: '#1F2937',
                  '&:hover': {
                    borderColor: '#F06292',
                    backgroundColor: '#F8BBD0',
                  },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: '#D1D5DB',
                  color: '#1F2937',
                  '&:hover': {
                    borderColor: '#F06292',
                    backgroundColor: '#F8BBD0',
                  },
                }}
              >
                Facebook
              </Button>
            </Stack>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                Don't have an account?{' '}
                <Link
                  href="/register"
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
                  Create one here
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
              background: 'linear-gradient(135deg, #F8BBD0 0%, #F06292 100%)',
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
             Skara-Luxe 
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerLogin;
