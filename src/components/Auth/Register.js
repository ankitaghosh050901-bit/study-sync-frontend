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
import { Link as RouterLink } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
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
          transform: "scale(0.95)", // ✅ slightly smaller to fit on one screen
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 800,
            color: "#000",
          }}
        >
          Register
        </Typography>

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
              Register
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
