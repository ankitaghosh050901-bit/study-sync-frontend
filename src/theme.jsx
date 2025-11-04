import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // MUI blue
      light: "#63a4ff",
      dark: "#004ba0",
    },
    secondary: {
      main: "#0288d1", // accent blue
    },
    background: {
      default: "#f5f9ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a237e",
      secondary: "#455a64",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
      color: "#0d47a1",
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  },
});

export default theme;
