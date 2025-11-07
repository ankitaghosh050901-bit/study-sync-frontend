// Register.js
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
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { register } from "../../features/auth/authSlice";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match!");
      return;
    }

    try {
      const result = await dispatch(
        register({
          username: form.username,
          email: form.email,
          password: form.password,
        })
      ).unwrap();

      console.log("Registration Successful:", result);

      // After successful registration and auto-login, navigate to groups page
      navigate("/groups");
    } catch (error) {
      console.error("Registration Error:", error);
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
        py: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          p: { xs: 2.5, md: 3 },
          borderRadius: 4,
          textAlign: "center",
          transform: "scale(0.95)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 800, color: "#000" }}>
          Register
        </Typography>

        {(error || validationError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError || error.message || "Error during registration!"}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              size="small"
              fullWidth
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              size="small"
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              size="small"
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TextField
              size="small"
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="medium"
              startIcon={<PersonAddAltIcon />}
              disabled={loading}
              sx={{
                mt: 1,
                py: 1,
                background: "linear-gradient(90deg,#1976d2,#9c27b0)",
                fontWeight: 700,
                letterSpacing: 0.4,
                "&:hover": {
                  background: "linear-gradient(90deg,#1565c0,#7b1fa2)",
                },
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Typography variant="body2" sx={{ mt: 1 }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#1976d2",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Log in
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
