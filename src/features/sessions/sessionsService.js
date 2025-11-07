// src/features/sessions/sessionsService.js
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

// Fetch all sessions with optional filters
export const fetchAllSessions = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.SESSIONS, { params });
  return response.data;
};

// Fetch a specific session by ID
export const fetchSessionById = async (sessionId) => {
  const response = await apiClient.get(API_ENDPOINTS.SESSION_DETAIL(sessionId));
  return response.data;
};

// Create a new session
export const createSession = async (sessionData) => {
  const response = await apiClient.post(API_ENDPOINTS.SESSIONS, sessionData);
  return response.data;
};

// Delete a session (admin-only)
export const deleteSession = async (sessionId) => {
  const response = await apiClient.delete(API_ENDPOINTS.SESSION_DETAIL(sessionId));
  return response.data;
};
