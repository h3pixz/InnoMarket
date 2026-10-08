import { createSlice } from '@reduxjs/toolkit';
import { loadCartState } from './storage';

const persisted = loadCartState();

const initialState = {
  items: persisted?.items ?? [],
  favoriteIds: persisted?.favoriteIds ?? [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index === -1) state.favoriteIds.push(id);
      else state.favoriteIds.splice(index, 1);
    },
  },
});

export const { addToCart, removeFromCart, toggleFavorite } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectFavoritesCount = (state) => state.cart.favoriteIds.length;
export const selectIsInCart = (id) => (state) =>
  state.cart.items.some((item) => item.id === id);
export const selectIsFavorite = (id) => (state) =>
  state.cart.favoriteIds.includes(id);

export default cartSlice.reducer;
