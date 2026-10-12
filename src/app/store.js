import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import { saveCartState, saveUserState } from './storage';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
  saveUserState(store.getState().user);
});
