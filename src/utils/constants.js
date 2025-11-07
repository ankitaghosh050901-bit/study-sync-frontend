// API Base URL
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register/',
  AUTH_LOGIN: '/auth/login/',
  AUTH_REFRESH: '/auth/refresh/',
  PROFILE: '/profile/',

  // Groups
  GROUPS: '/groups/',
  MY_GROUPS: '/groups/my-groups/',
  MY_ADMIN_GROUPS: '/groups/my-admin-groups/',
  GROUP_JOIN: (id) => `/groups/${id}/join/`,
  GROUP_LEAVE: (id) => `/groups/${id}/leave/`,

  // Sessions
  SESSIONS: '/sessions/',
  SESSION_DETAIL: (id) => `/sessions/${id}/`,
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  PROFILE: 'profile',
};
