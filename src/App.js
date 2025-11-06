import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import GroupsGrid from "./components/Groups/GroupsGrid";
import MyAdminGroupPage from "./components/Groups/MyAdminGroupPage";
import { Box, CssBaseline } from "@mui/material";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* ✅ Pass authentication prop to Header if needed */}
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* ✅ Login Page with success handler */}
            <Route
              path="/login"
              element={<Login onLogin={() => setIsAuthenticated(true)} />}
            />

            {/* Register Page */}
            <Route path="/register" element={<Register />} />

            {/* ✅ Protected Groups Page */}
            <Route
              path="/groups"
              element={
                isAuthenticated ? (
                  <GroupsGrid />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ✅ Protected Admin Group Page */}
            <Route
              path="/create-group"
              element={
                isAuthenticated ? (
                  <MyAdminGroupPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
