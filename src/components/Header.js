import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Groups";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Header = () => {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white", // ✅ white navbar
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Gradient StudySync Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1976d2, #9c27b0)", // ✅ Blue → Violet
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          StudySync
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Home Button */}
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: 500,
              border: "1px solid #ddd",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>

          {/* ✅ Show MY GROUPS only on other pages */}
          {!["/", "/login", "/register"].includes(location.pathname) && (
            <Button
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: 500,
                border: "1px solid #ddd",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
              component={RouterLink}
              to="/groups"
              startIcon={<GroupIcon />}
            >
              My Groups
            </Button>
          )}

          {/* ✅ Gradient Login Button */}
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

          {/* ✅ Gradient Register Button */}
          <Button
            sx={{
              background: "linear-gradient(90deg, #9c27b0, #e040fb)", // Purple gradient
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(90deg, #7b1fa2, #d500f9)",
              },
            }}
            component={RouterLink}
            to="/register"
            startIcon={<PersonAddAltIcon />}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
