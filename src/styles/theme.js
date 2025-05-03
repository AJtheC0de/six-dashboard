// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0071e3", // Apple Blau
      dark: "#0052a5",
      light: "#3d94ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f5f5f7", // Apple Grau
      dark: "#d2d2d7",
      light: "#ffffff",
      contrastText: "#1d1d1f",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f7",
    },
    text: {
      primary: "#1d1d1f",
      secondary: "#86868b",
    },
    error: {
      main: "#ff3b30", // Apple Rot
    },
    warning: {
      main: "#ff9500", // Apple Orange
    },
    success: {
      main: "#34c759", // Apple Grün
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(0,0,0,0.03), 0px 1px 3px 0px rgba(0,0,0,0.03)",
    // ... Weitere Schatten
    "0px 8px 10px -5px rgba(0,0,0,0.12), 0px 16px 24px 2px rgba(0,0,0,0.07), 0px 6px 30px 5px rgba(0,0,0,0.05)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          padding: "8px 16px",
          fontSize: "0.9375rem",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
