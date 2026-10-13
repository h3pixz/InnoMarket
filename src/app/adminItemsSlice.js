import { createSlice } from '@reduxjs/toolkit';
import { loadAdminItems } from './storage';

const persisted = loadAdminItems();

const initialState = {
  items: persisted?.items ?? [],
};

const adminItemsSlice = createSlice({
  name: 'adminItems',
  initialState,
  reducers: {
    addAdminItem(state, action) {
      state.items.unshift(action.payload);
    },
    removeAdminItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeAdminItems(state, action) {
      const ids = new Set(action.payload);
      state.items = state.items.filter((item) => !ids.has(item.id));
    },
  },
});

export const { addAdminItem, removeAdminItem, removeAdminItems } =
  adminItemsSlice.actions;

export const selectAddedItems = (state) => state.adminItems.items;

export default adminItemsSlice.reducer;
