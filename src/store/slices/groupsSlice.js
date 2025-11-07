// src/store/slices/groupsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  joinedGroups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    clearGroups: (state) => {
      state.groups = [];
      state.joinedGroups = [];
      state.selectedGroup = null;
    },
  },
});

export const { setGroups, setJoinedGroups, setSelectedGroup, clearGroups } =
  groupsSlice.actions;
export default groupsSlice.reducer;
