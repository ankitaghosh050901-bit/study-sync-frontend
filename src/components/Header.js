import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          StudySync
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
            component={RouterLink}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
