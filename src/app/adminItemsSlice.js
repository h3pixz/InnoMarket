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
  },
});

export const { addAdminItem } = adminItemsSlice.actions;

export const selectAddedItems = (state) => state.adminItems.items;

export default adminItemsSlice.reducer;
