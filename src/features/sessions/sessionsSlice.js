// src/features/sessions/sessionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as sessionsService from './sessionsService';
import { handleAsyncError } from '../../utils/errorHandler';

// Async thunk for fetching sessions
export const fetchSessions = createAsyncThunk(
  'sessions/fetchSessions',
  async (params, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchAllSessions(params);
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for fetching a single session
export const fetchSession = createAsyncThunk(
  'sessions/fetchSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchSessionById(sessionId);
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for creating a session
export const createSession = createAsyncThunk(
  'sessions/createSession',
  async (sessionData, { rejectWithValue }) => {
    try {
      return await sessionsService.createSession(sessionData);
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for deleting a session
export const deleteSession = createAsyncThunk(
  'sessions/deleteSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      await sessionsService.deleteSession(sessionId);
      return sessionId;
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

const initialState = {
  sessions: [],
  selectedSession: null,
  loading: false,
  error: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = [];
      state.selectedSession = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Sessions
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Session
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSession = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Session
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Session
    builder
      .addCase(deleteSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.loading = false;
        const sessionId = action.payload;
        state.sessions = state.sessions.filter(s => s.id !== sessionId);
        if (state.selectedSession?.id === sessionId) {
          state.selectedSession = null;
        }
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSession, clearSessions, clearError } = sessionsSlice.actions;
export default sessionsSlice.reducer;
