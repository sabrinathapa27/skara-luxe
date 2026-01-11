import React, { memo } from "react";
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

const NAV_LINKS = ["Home", "Collections", "About", "Contact"];
const ACTIONS = [
  { icon: SearchIcon, label: "Search" },
  { icon: FavoriteIcon, label: "Favorites" },
  { icon: ShoppingBagIcon, label: "Cart" },
];
const NavButton = memo(({ link }) => {
  const theme = useTheme();

  return (
    <Button
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
});

NavButton.displayName = "NavButton";
const ActionIcon = memo(({ Icon, label }) => (
  <IconButton sx={{ color: "#1F2937" }} size="medium" aria-label={label}>
    <Icon />
  </IconButton>
));

ActionIcon.displayName = "ActionIcon";

const Appbar = () => {
  const theme = useTheme();

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
          <Stack direction="row" alignItems="center" spacing={2}>
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
                cursor: "pointer",
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
              Order Now
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default memo(Appbar);
