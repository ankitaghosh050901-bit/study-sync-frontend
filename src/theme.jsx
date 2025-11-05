import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:
      '"Inter Variable", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h2: { fontWeight: 800 },
  },
  palette: {
    mode: "light",
    primary: { main: "#1976d2" }, // blue
    secondary: { main: "#9c27b0" }, // purple
    background: { default: "#f7f9fc" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { boxShadow: "0 12px 32px rgba(0,0,0,0.12)" } },
    },
  },
});

export default theme;
