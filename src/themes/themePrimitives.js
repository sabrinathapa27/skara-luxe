import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F06292", 
      light: "#F8BBD0", 
      dark: "#EC407A",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#7B1FA2", 
      light: "#AE52D4",
      dark: "#4A0072",
      contrastText: "#FFFFFF",
    },

    common: {
      white: "#FFFFFF",
      black: "#000000",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
    },

    action: {
      active: "#6B7280",
      hover: "#F3F4F6",
      selected: "#F9FAFB",
      disabled: "#D1D5DB",
      disabledBackground: "#F3F4F6",
    },

    success: {
      main: "#10B981",
      light: "#D1FAE5",
      dark: "#065F46",
    },
    warning: {
      main: "#F59E0B",
      light: "#FEF3C7",
      dark: "#92400E",
    },
    error: {
      main: "#EF4444",
      light: "#FEE2E2",
      dark: "#991B1B",
    },
    info: {
      main: "#3B82F6",
      light: "#DBEAFE",
      dark: "#1E40AF",
    },

    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    divider: "#E5E7EB",
  },

  typography: {
    fontFamily: [
      "'Inter'",
      "'-apple-system'",
      "'BlinkMacSystemFont'",
      "'Segoe UI'",
      "'Roboto'",
      "'Oxygen'",
      "'Ubuntu'",
      "'Cantarell'",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      "sans-serif",
    ].join(","),

    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "3rem", // 48px
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: "1.5rem", 
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.6,
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.6,
    },

    body1: {
      fontSize: "1rem", 
      lineHeight: 1.75,
    },
    body2: {
      fontSize: "0.875rem", 
      lineHeight: 1.75,
    },

    // Buttons
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.9375rem", 
    },

    // Captions
    caption: {
      fontSize: "0.75rem", 
      lineHeight: 1.75,
    },

    // Overline
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },

  spacing: 8,

  shape: {
    borderRadius: 8,
  },

  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    ...Array(19).fill("none"), 
  ],

  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow:
              "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});

export const colors = {
  pink: {
    main: "#F06292",
    light: "#F8BBD0",
    dark: "#EC407A",
  },

  purple: {
    main: "#7B1FA2",
    light: "#AE52D4",
    dark: "#4A0072",
  },

  grey: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
};

export const typographyConstants = {
  fontFamily: {
    primary: "'Playfair Display', serif",
    secondary: "'Inter', sans-serif",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export default theme;