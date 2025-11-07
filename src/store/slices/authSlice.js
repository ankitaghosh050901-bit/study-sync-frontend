// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Helper to save auth data to localStorage
const saveAuthToStorage = (access, refresh, user, profile) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  if (user) localStorage.setItem("user", JSON.stringify(user));
  if (profile) localStorage.setItem("profile", JSON.stringify(profile));
};

// Helper to clear auth data from localStorage
const clearAuthFromStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
};

// Helper to load auth data from localStorage
const loadAuthFromStorage = () => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");
  const userStr = localStorage.getItem("user");
  const profileStr = localStorage.getItem("profile");

  return {
    accessToken: access,
    refreshToken: refresh,
    user: userStr ? JSON.parse(userStr) : null,
    profile: profileStr ? JSON.parse(profileStr) : null,
  };
};

// Async thunk for registration with auto-login
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      // Step 1: Register the user
      await axios.post(`${API_BASE_URL}/api/auth/register/`, {
        username,
        email,
        password,
      });

      // Step 2: Auto-login after successful registration
      const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        username,
        password,
      });

      const { access, refresh } = loginResponse.data;

      // Step 3: Fetch user profile
      const profileResponse = await axios.get(`${API_BASE_URL}/api/profile/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const profile = profileResponse.data;
      const user = { username, email };

      // Save to localStorage
      saveAuthToStorage(access, refresh, user, profile);

      return { access, refresh, user, profile };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Step 1: Login
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        username,
        password,
      });

      const { access, refresh } = response.data;

      // Step 2: Fetch user profile
      const profileResponse = await axios.get(`${API_BASE_URL}/api/profile/`, {
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
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/profile/");
      const profile = response.data;
      
      // Update profile in localStorage
      localStorage.setItem("profile", JSON.stringify(profile));
      
      return profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/api/profile/", profileData);
      const profile = response.data;
      
      // Update profile in localStorage
      localStorage.setItem("profile", JSON.stringify(profile));
      
      return profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile" }
      );
    }
  }
);

// Initial state - check localStorage for existing auth data
const storedAuth = loadAuthFromStorage();

const initialState = {
  user: storedAuth.user,
  profile: storedAuth.profile,
  accessToken: storedAuth.accessToken,
  refreshToken: storedAuth.refreshToken,
  isAuthenticated: !!storedAuth.accessToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Action to rehydrate auth state from localStorage
    rehydrateAuth: (state) => {
      const storedAuth = loadAuthFromStorage();
      state.user = storedAuth.user;
      state.profile = storedAuth.profile;
      state.accessToken = storedAuth.accessToken;
      state.refreshToken = storedAuth.refreshToken;
      state.isAuthenticated = !!storedAuth.accessToken;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
