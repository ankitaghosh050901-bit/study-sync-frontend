import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import backgroundImage from "../assets/photo1.jpeg"; // ✅ make sure image exists here

const Landing = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.75))",
          zIndex: 1,
        }}
      />

      {/* main content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2.2rem", md: "3.8rem" },
            textShadow: "0 3px 10px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to StudySync
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 4,
            lineHeight: 1.5,
          }}
        >
          Collaborate. Share Notes. Track Progress. All in one platform for
          students and study groups.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={RouterLink}
            to="/register"
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PersonAddAltIcon />}
            sx={{
              fontWeight: 700,
              px: 4,
              boxShadow: "0 6px 16px rgba(25,118,210,0.5)",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            Register
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            size="large"
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            sx={{
              fontWeight: 700,
              px: 4,
              boxShadow: "0 6px 16px rgba(156,39,176,0.45)",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Landing;
