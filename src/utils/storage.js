import { STORAGE_KEYS } from './constants';

// Helper to save auth data to localStorage
export const saveAuthToStorage = (access, refresh, user, profile) => {
  if (access) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
  if (refresh) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  if (profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

// Helper to clear auth data from localStorage
export const clearAuthFromStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
};

// Helper to load auth data from localStorage
export const loadAuthFromStorage = () => {
  const access = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const refresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  const profileStr = localStorage.getItem(STORAGE_KEYS.PROFILE);

  let user = null;
  let profile = null;

  // Safely parse JSON with error handling
  try {
    if (userStr) user = JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  try {
    if (profileStr) profile = JSON.parse(profileStr);
  } catch (error) {
    console.error('Failed to parse profile data from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  }

  return {
    accessToken: access,
    refreshToken: refresh,
    user,
    profile,
  };
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// Update profile in storage while preserving other auth data
export const updateProfileInStorage = (profile) => {
  const storedAuth = loadAuthFromStorage();
  saveAuthToStorage(
    storedAuth.accessToken,
    storedAuth.refreshToken,
    storedAuth.user,
    profile
  );
};
