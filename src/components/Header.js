import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Groups";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AuthButton from "./AuthButton"; // ✅ New import

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1976d2, #9c27b0)",
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

          {/* Show MY GROUPS only when logged in */}
          {isAuthenticated && (
            <>
              {/* My Groups Button */}
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

              {/* Create Group Button */}
              <Button
                sx={{
                  bgcolor: "#4caf50", // Green color
                  color: "white",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#388e3c" },
                }}
                component={RouterLink}
                to="/create-group" // Assuming this is the route for creating a group
              >
                Create Group
              </Button>
            </>
          )}

          {/* Register Button (hide if logged in) */}
          {!isAuthenticated && (
            <Button
              sx={{
                background: "linear-gradient(90deg, #9c27b0, #e040fb)",
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
          )}

          {/* Reusable AuthButton for Login/Logout */}
          <AuthButton
            isAuthenticated={isAuthenticated}
            onLogout={() => setIsAuthenticated(false)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
