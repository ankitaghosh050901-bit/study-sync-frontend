// src/api/apiClient.js
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import { clearAuthFromStorage, getAccessToken, getRefreshToken } from '../utils/storage';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
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

      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        try {
          // Try to refresh the access token
          const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH_REFRESH}`,
            { refresh: refreshToken }
          );

          const { access } = response.data;
          
          // Store new access token
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${access}`;

          // Retry the original request with the new token
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          clearAuthFromStorage();
          
          // Note: Using window.location.href for full page reload is intentional.
          // This axios interceptor runs outside React context, so we can't use
          // React Router navigation. A full reload ensures clean auth state
          // after token expiration, preventing stale data or infinite loops.
          // The Redux store will be rehydrated from localStorage on next load.
          window.location.href = '/login';
          
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        // Using window.location.href for the same reason as above
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
