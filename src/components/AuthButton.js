import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../store/slices/authSlice";

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
