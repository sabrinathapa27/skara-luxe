import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ContactForm from "./ContactForm";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StoreIcon from "@mui/icons-material/Store";

const ContactList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const contactInfo = {
    phone: [
      { location: "Kathmandu", number: "+977-9801874982" },
      { location: "Pokhara", number: "+977-9748212297" },
    ],
    email: [
      {
        department: "Career - Kathmandu",
        address: "skaraluxektm.nepal@gmail.com",
      },
      {
        department: "Career - Pokhara",
        address: "skaraluxepk.nepal@gmail.com",
      },
      { department: "Business & Collaboration", address: "info@skaraluxe.com" },
    ],
    locations: [
      {
        city: "SkaraLuxe Headquarter",
        address: "Pepsi cola Kathmandu",
      },
      {
        city: "Pokhara",
        address: "Thriftyseven, ratna chowk, oppo. LA grande college, Pokhara",
      },
    ],
  };

  return (
    <Box sx={{ py: 2, px: 2 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6, maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Want to get in touch? Here's how you can reach us.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* LEFT SIDE  */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              height: "100%",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Contact Cards - Better organized */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Phone Numbers Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneIcon color="primary" /> Phone Numbers
                </Typography>
                <List disablePadding>
                  {contactInfo.phone.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start" disablePadding>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <BusinessIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={500}>
                              {item.location}
                            </Typography>
                          }
                          secondary={
                            <Link
                              href={`tel:${item.number.replace(/-/g, "")}`}
                              color="text.primary"
                              sx={{
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {item.number}
                            </Link>
                          }
                        />
                      </ListItem>
                      {index < contactInfo.phone.length - 1 && (
                        <Divider component="li" sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>

              {/* Email Addresses Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EmailIcon color="primary" /> Email Addresses
                </Typography>
                <List disablePadding>
                  {contactInfo.email.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start" disablePadding>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <WorkIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={500}>
                              {item.department}
                            </Typography>
                          }
                          secondary={
                            <Link
                              href={`mailto:${item.address}`}
                              color="text.primary"
                              sx={{
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {item.address}
                            </Link>
                          }
                        />
                      </ListItem>
                      {index < contactInfo.email.length - 1 && (
                        <Divider component="li" sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>

              {/* Locations Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LocationOnIcon color="primary" /> Our Locations
                </Typography>
                <List disablePadding>
                  {contactInfo.locations.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start" disablePadding>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <BusinessIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={500}>
                              {item.city}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {item.address}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < contactInfo.locations.length - 1 && (
                        <Divider component="li" sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT SIDE - Form and Additional Info Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: "100%" }}>
            {/* Form Section */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                mb: 4,
              }}
            >
              <ContactForm />
            </Paper>

            {/* Additional Info Section - Below the Form */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    height: "100%",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <AccessTimeIcon
                      sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Business Hours
                    </Typography>
                    <Typography variant="body2">
                      Sunday - Friday: 9:00 AM - 6:00 PM
                    </Typography>
                    <Typography variant="body2">Saturday: Closed</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    height: "100%",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <StoreIcon
                      sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Visit Our Store
                    </Typography>
                    <Typography variant="body2">
                      Experience our saree collection in person
                    </Typography>
                    <Typography variant="body2">
                      Expert styling advice
                    </Typography>
                    <Typography variant="body2">
                      Custom fittings available
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactList;
