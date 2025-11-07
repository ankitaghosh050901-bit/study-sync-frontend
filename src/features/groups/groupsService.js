// src/features/groups/groupsService.js
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

// Fetch all groups (discover - groups user has not joined)
export const fetchAllGroups = async () => {
  const response = await apiClient.get(API_ENDPOINTS.GROUPS);
  return response.data;
};

// Fetch user's joined groups
export const fetchMyGroups = async () => {
  const response = await apiClient.get(API_ENDPOINTS.MY_GROUPS);
  return response.data;
};

// Fetch user's admin groups
export const fetchMyAdminGroups = async () => {
  const response = await apiClient.get(API_ENDPOINTS.MY_ADMIN_GROUPS);
  return response.data;
};

// Create a new group
export const createGroup = async (groupData) => {
  const response = await apiClient.post(API_ENDPOINTS.GROUPS, groupData);
  return response.data;
};

// Join a group
export const joinGroup = async (groupId) => {
  const response = await apiClient.post(API_ENDPOINTS.GROUP_JOIN(groupId), {});
  return response.data;
};

// Leave a group
export const leaveGroup = async (groupId) => {
  const response = await apiClient.post(API_ENDPOINTS.GROUP_LEAVE(groupId), {});
  return response.data;
};
