import React, { useState, useEffect } from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import {
  Favorite,
  ShoppingBag,
  Home,
  Store,
  ContactMail,
  Menu,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const NAV_LINKS = [
  { text: "Home", icon: <Home />, path: "/" },
  { text: "Collections", icon: <Store />, path: "/collections" },
  { text: "Contact", icon: <ContactMail />, path: "/contact" },
];

const ACTIONS = [
  { icon: Favorite, label: "Favorites" },
  { icon: ShoppingBag, label: "Cart", path: "/cart" },
];

const Appbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = getCartCount();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const NavButton = ({ link }) => {
    const handleClick = () => {
      switch (link.toLowerCase()) {
        case "home":
          navigate("/");
          break;
        case "collections":
          navigate("/collections");
          break;
        case "contact":
          navigate("/contact");
          break;
        default:
          navigate("/");
      }
    };

    return (
      <Button
        onClick={handleClick}
        sx={{
          color: "#1F2937",
          fontSize: "1rem",
          fontWeight: 500,
          textTransform: "capitalize",
          position: "relative",
          minWidth: "auto",
          px: 1,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-4px",
            left: 0,
            width: 0,
            height: "2px",
            backgroundColor: theme.palette.primary.main,
            transition: "width 250ms ease-in-out",
          },
          "&:hover::after": {
            width: "100%",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {link}
      </Button>
    );
  };

  const ActionIcon = ({ Icon, label, path, badgeCount }) => {
    const handleActionClick = () => {
      if (path) {
        navigate(path);
      }
    };

    return (
      <IconButton
        onClick={handleActionClick}
        sx={{ color: "#1F2937" }}
        size="medium"
        aria-label={label}
      >
        {label === "Cart" && badgeCount > 0 ? (
          <Badge badgeContent={badgeCount} color="primary">
            <Icon />
          </Badge>
        ) : (
          <Icon />
        )}
      </IconButton>
    );
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Mobile drawer
  const drawer = (
    <Box sx={{ width: 280 }} onClick={handleDrawerToggle}>
      {/* Logo in drawer */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Skara-Luxe Logo"
            sx={{
              height: 40,
              width: "auto",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: theme.palette.primary.dark,
              fontWeight: 700,
            }}
          >
            SkaraLuxe
          </Typography>
        </Stack>
      </Box>

      <Divider />

      {/* Navigation Links */}
      <List>
        {NAV_LINKS.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
              sx={{
                py: 1.5,
                px: 3,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + "20",
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Actions in drawer */}
      <List>
        {ACTIONS.map((action) => (
          <ListItem key={action.label} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(action.path);
                handleDrawerToggle();
              }}
              sx={{
                py: 1.5,
                px: 3,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + "20",
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {action.label === "Cart" && cartCount > 0 ? (
                  <Badge badgeContent={cartCount} color="primary">
                    <action.icon />
                  </Badge>
                ) : (
                  <action.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={action.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Auth Buttons in drawer */}
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              navigate("/login");
              handleDrawerToggle();
            }}
            sx={{
              backgroundColor: theme.palette.primary.main,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              navigate("/register");
              handleDrawerToggle();
            }}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.dark,
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <MuiAppBar
        component="nav"
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              py: 1,
              minHeight: { xs: 60, md: 70 },
            }}
          >
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" }, color: "#1F2937" }}
            >
              <Menu />
            </IconButton>

            {/* Logo Section */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ cursor: "pointer", flex: 1 }}
              onClick={handleLogoClick}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Skara-Luxe Logo"
                sx={{
                  height: { xs: 36, md: 44 },
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  color: theme.palette.primary?.dark || "#EC407A",
                  fontWeight: 700,
                  display: { xs: "none", sm: "block" },
                  fontSize: { sm: "1.75rem", md: "2rem" },
                }}
              >
                SkaraLuxe
              </Typography>
            </Stack>

            {/* Navigation Links - Desktop */}
            <Stack
              component="nav"
              direction="row"
              spacing={{ xs: 1, md: 3 }}
              sx={{
                display: { xs: "none", md: "flex" },
                flex: 1,
                justifyContent: "center",
              }}
            >
              {NAV_LINKS.map((item) => (
                <NavButton key={item.text} link={item.text} />
              ))}
            </Stack>

            {/* Actions Section */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ flex: 1, justifyContent: "flex-end" }}
            >
              {ACTIONS.map((action, index) => (
                <ActionIcon
                  key={index}
                  Icon={action.icon}
                  label={action.label}
                  path={action.path}
                  badgeCount={action.label === "Cart" ? cartCount : 0}
                />
              ))}

              {/* Auth Buttons - Desktop */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => navigate("/login")}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#FFFFFF",
                    px: 2,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "0.9375rem",
                    minWidth: "auto",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-1px)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                  size="small"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    px: 2,
                    py: 1,
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "#2C1B47",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </MuiAppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Appbar;
