import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Stack,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import api from "./api"; // Axios instance

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" }); // Update to use 'username' instead of 'email'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the request with 'username' and 'password'
      const response = await api.post("http://127.0.0.1:8000/api/auth/login/", {
        username: form.username, // Use 'username' instead of 'email'
        password: form.password,
      });

      const { access, refresh } = response.data;
      console.log("Login Successful:", response.data);

      // Save tokens to localStorage/sessionStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Mark user as logged in
      onLogin(); // pass the function to set `isAuthenticated` in the parent component

      // Redirect user to groups page
      navigate("/groups");
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error
      );
      alert("Invalid credentials or error during login");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(25,118,210,0.05), rgba(156,39,176,0.08))",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: "#000" }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Username input instead of email */}
            <TextField
              fullWidth
              type="text" // This is a username field, not an email field
              label="Username"
              name="username" // Updated from 'email' to 'username'
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* Gradient login button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                mt: 1,
                py: 1.2,
                background: "linear-gradient(90deg,#1976d2,#9c27b0)",
                fontWeight: 700,
                letterSpacing: 0.4,
                "&:hover": {
                  background: "linear-gradient(90deg,#1565c0,#7b1fa2)",
                },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#1976d2",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
