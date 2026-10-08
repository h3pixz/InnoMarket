import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
