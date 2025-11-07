// src/services/apiClient.js
import axios from "axios";

// Base API URL - this should ideally come from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token refresh on 401
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      
      if (refreshToken) {
        try {
          // Try to refresh the access token
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh/`,
            { refresh: refreshToken }
          );

          const { access } = response.data;
          
          // Store new access token
          localStorage.setItem("access_token", access);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${access}`;

          // Retry the original request with the new token
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          localStorage.removeItem("profile");
          
          // Note: Using window.location.href instead of React Router navigation
          // because this is an axios interceptor outside React component context.
          // A full page reload ensures clean state after auth failure.
          window.location.href = "/login";
          
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        // Using window.location.href for the same reason as above
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
