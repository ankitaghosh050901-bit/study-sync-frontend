import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthButton = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Update parent state
    navigate("/"); // Redirect to home after logout
  };

  if (isAuthenticated) {
    // ✅ Show LOGOUT
    return (
      <Button
        sx={{
          background: "linear-gradient(90deg, #d32f2f, #ef5350)", // Red gradient
          color: "white",
          fontWeight: 600,
          "&:hover": {
            background: "linear-gradient(90deg, #b71c1c, #c62828)",
          },
        }}
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    );
  }

  // ✅ Show LOGIN if not authenticated
  return (
    <Button
      sx={{
        background: "linear-gradient(90deg, #1976d2, #42a5f5)", // Blue gradient
        color: "white",
        fontWeight: 600,
        "&:hover": {
          background: "linear-gradient(90deg, #1565c0, #1e88e5)",
        },
      }}
      component={RouterLink}
      to="/login"
      startIcon={<LoginIcon />}
    >
      Login
    </Button>
  );
};

export default AuthButton;
