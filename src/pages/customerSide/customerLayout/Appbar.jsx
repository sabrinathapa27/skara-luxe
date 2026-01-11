import React, { useEffect } from "react";
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
} from "@mui/material";
import {
  FavoriteBorder as FavoriteIcon,
  Search as SearchIcon,
  ShoppingBagOutlined as ShoppingBagIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = ["Home", "Collections", "Contact"];
const ACTIONS = [
  { icon: SearchIcon, label: "Search" },
  { icon: FavoriteIcon, label: "Favorites" },
  { icon: ShoppingBagIcon, label: "Cart" },
];

const Appbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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

  const ActionIcon = ({ Icon, label }) => {
    const handleActionClick = () => {
      switch (label.toLowerCase()) {
        case "search":
          console.log("Search clicked");
          break;
        case "favorites":
          navigate("/wishlist");
          break;
        case "cart":
          navigate("/cart");
          break;
        default:
          console.log(`${label} clicked`);
      }
    };

    return (
      <IconButton
        onClick={handleActionClick}
        sx={{ color: "#1F2937" }}
        size="medium"
        aria-label={label}
      >
        <Icon />
      </IconButton>
    );
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
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
          {/* Logo Section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: "pointer" }}
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

          {/* Navigation Links */}
          <Stack
            component="nav"
            direction="row"
            spacing={{ xs: 1, md: 3 }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {NAV_LINKS.map((link) => (
              <NavButton key={link} link={link} />
            ))}
          </Stack>

          {/* Actions Section */}
          <Stack direction="row" spacing={1} alignItems="center">
            {ACTIONS.map((action, index) => (
              <ActionIcon key={index} Icon={action.icon} label={action.label} />
            ))}

            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate("/register")}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#FFFFFF",
                px: { xs: 1.5, md: 2 },
                py: 1,
                ml: { xs: 0.5, md: 1 },
                fontWeight: 600,
                borderRadius: "4px",
                textTransform: "none",
                fontSize: { xs: "0.875rem", md: "0.9375rem" },
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
                px: { xs: 1.5, md: 2 },
                py: 1,
                ml: { xs: 0.5, md: 1 },
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: "#2C1B47",
                  transform: "translateY(-2px)",
                },
              }}
            >
              SignUp
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default Appbar;
