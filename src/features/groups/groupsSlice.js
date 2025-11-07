// src/features/groups/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as groupsService from './groupsService';
import { handleAsyncError } from '../../utils/errorHandler';

// Async thunk for fetching all groups (explore)
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await groupsService.fetchAllGroups();
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for fetching user's joined groups
export const fetchJoinedGroups = createAsyncThunk(
  'groups/fetchJoinedGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await groupsService.fetchMyGroups();
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for fetching user's admin groups
export const fetchAdminGroups = createAsyncThunk(
  'groups/fetchAdminGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await groupsService.fetchMyAdminGroups();
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for creating a group
export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      return await groupsService.createGroup(groupData);
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for joining a group
export const joinGroupAction = createAsyncThunk(
  'groups/joinGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await groupsService.joinGroup(groupId);
      return groupId;
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// Async thunk for leaving a group
export const leaveGroupAction = createAsyncThunk(
  'groups/leaveGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await groupsService.leaveGroup(groupId);
      return groupId;
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

const initialState = {
  exploreGroups: [],
  joinedGroups: [],
  adminGroups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    clearGroups: (state) => {
      state.exploreGroups = [];
      state.joinedGroups = [];
      state.adminGroups = [];
      state.selectedGroup = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Groups (Explore)
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.exploreGroups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Joined Groups
    builder
      .addCase(fetchJoinedGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJoinedGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedGroups = action.payload;
      })
      .addCase(fetchJoinedGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Admin Groups
    builder
      .addCase(fetchAdminGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.adminGroups = action.payload;
      })
      .addCase(fetchAdminGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Group
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.adminGroups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Join Group
    builder
      .addCase(joinGroupAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinGroupAction.fulfilled, (state, action) => {
        state.loading = false;
        const groupId = action.payload;
        
        // Move group from explore to joined
        const groupIndex = state.exploreGroups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          const group = state.exploreGroups[groupIndex];
          state.joinedGroups.push(group);
          state.exploreGroups.splice(groupIndex, 1);
        }
      })
      .addCase(joinGroupAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Leave Group
    builder
      .addCase(leaveGroupAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveGroupAction.fulfilled, (state, action) => {
        state.loading = false;
        const groupId = action.payload;
        
        // Move group from joined to explore
        const groupIndex = state.joinedGroups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          const group = state.joinedGroups[groupIndex];
          state.exploreGroups.push(group);
          state.joinedGroups.splice(groupIndex, 1);
        }
      })
      .addCase(leaveGroupAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedGroup, clearGroups, clearError } = groupsSlice.actions;
export default groupsSlice.reducer;
