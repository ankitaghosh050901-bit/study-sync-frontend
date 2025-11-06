import axios from 'axios';

const API_BASE_URL = '/api';

export const GroupService = {
  // Create a new group
  createGroup: async (data) => {
    const token = localStorage.getItem('access_token');
    return axios.post(`${API_BASE_URL}/groups/`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  // Get available groups to join
  listGroups: async () => {
    const token = localStorage.getItem('access_token');
    return axios.get(`${API_BASE_URL}/groups/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Get groups the user has joined
  getMyGroups: async () => {
    const token = localStorage.getItem('access_token');
    return axios.get(`${API_BASE_URL}/groups/my-groups/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Get groups where user is admin
  getMyAdminGroups: async () => {
    const token = localStorage.getItem('access_token');
    return axios.get(`${API_BASE_URL}/groups/my-admin-groups/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Join a group
  joinGroup: async (groupId) => {
    const token = localStorage.getItem('access_token');
    return axios.post(`${API_BASE_URL}/groups/${groupId}/join/`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Leave a group
  leaveGroup: async (groupId) => {
    const token = localStorage.getItem('access_token');
    return axios.post(`${API_BASE_URL}/groups/${groupId}/leave/`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};