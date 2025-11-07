// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from './authService';
import { loadAuthFromStorage, clearAuthFromStorage, saveAuthToStorage } from '../../utils/storage';
import { handleAsyncError } from '../../utils/errorHandler';

// Async thunk for registration with auto-login
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      return await authService.registerUser({ username, email, password });
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await authService.loginUser({ username, password });
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await authService.fetchUserProfile();
      
      // Update profile in localStorage
      const storedAuth = loadAuthFromStorage();
      saveAuthToStorage(
        storedAuth.accessToken,
        storedAuth.refreshToken,
        storedAuth.user,
        profile
      );
      
      return profile;
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const profile = await authService.updateUserProfile(profileData);
      
      // Update profile in localStorage
      const storedAuth = loadAuthFromStorage();
      saveAuthToStorage(
        storedAuth.accessToken,
        storedAuth.refreshToken,
        storedAuth.user,
        profile
      );
      
      return profile;
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
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
  name: 'auth',
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
