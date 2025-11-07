// src/store/slices/sessionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  selectedSession: null,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = [];
      state.selectedSession = null;
    },
  },
});

export const { setSessions, setSelectedSession, clearSessions } =
  sessionsSlice.actions;
export default sessionsSlice.reducer;
