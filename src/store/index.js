// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import groupsReducer from "./slices/groupsSlice";
import sessionsReducer from "./slices/sessionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupsReducer,
    sessions: sessionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
