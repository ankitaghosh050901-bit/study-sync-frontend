import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import backgroundImage from "../assets/photo1.jpeg";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";


const Landing = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        px: 3,
      }}
    >
      <Box sx={{ backgroundColor: "rgba(0,0,0,0.5)", p: 4, borderRadius: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to StudySync
        </Typography>
        <Typography variant="h6" gutterBottom>
          Collaborate. Share Notes. Track Progress. All in one platform for
          students and study groups.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
          >
            Register
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="inherit"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
