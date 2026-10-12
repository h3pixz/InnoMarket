import { createSlice } from '@reduxjs/toolkit';
import { loadUserState } from './storage';

const persisted = loadUserState();

const initialState = {
  user: persisted?.user ?? null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => Boolean(state.user.user);

export default userSlice.reducer;
