import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import GroupsPage from "./pages/Groups/GroupsPage";
import MyAdminGroupPage from "./components/Groups/MyAdminGroupPage";
import { Box, CssBaseline } from "@mui/material";

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Login Page */}
            <Route path="/login" element={<LoginPage />} />

            {/* Register Page */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Groups Page */}
            <Route
              path="/groups"
              element={
                isAuthenticated ? (
                  <GroupsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Protected Admin Group Page */}
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

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
