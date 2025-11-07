// src/features/auth/authService.js
import axios from 'axios';
import apiClient from '../../api/apiClient';
import { API_BASE_URL, API_ENDPOINTS } from '../../utils/constants';
import { saveAuthToStorage } from '../../utils/storage';

// Register user and auto-login
export const registerUser = async ({ username, email, password }) => {
  // Step 1: Register the user
  await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH_REGISTER}`, {
    username,
    email,
    password,
  });

  // Step 2: Auto-login after successful registration
  const loginResponse = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
    username,
    password,
  });

  const { access, refresh } = loginResponse.data;

  // Step 3: Fetch user profile
  const profileResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  const profile = profileResponse.data;
  const user = { username, email };

  // Save to localStorage
  saveAuthToStorage(access, refresh, user, profile);

  return { access, refresh, user, profile };
};

// Login user
export const loginUser = async ({ username, password }) => {
  // Step 1: Login
  const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
    username,
    password,
  });

  const { access, refresh } = response.data;

  // Step 2: Fetch user profile
  const profileResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  const profile = profileResponse.data;
  // Extract email from profile or set it from profile if available
  const user = { 
    username,
    email: profile.email || profile.user?.email
  };

  // Save to localStorage
  saveAuthToStorage(access, refresh, user, profile);

  return { access, refresh, user, profile };
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROFILE);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put(API_ENDPOINTS.PROFILE, profileData);
  return response.data;
};
