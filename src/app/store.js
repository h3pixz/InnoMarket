import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import cartReducer from './cartSlice';
import { saveCartState } from './storage';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
