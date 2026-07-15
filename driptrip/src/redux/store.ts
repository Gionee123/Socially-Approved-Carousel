import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../redux/adminslice';

export const store = configureStore({
  reducer: {
    loginStore: loginSlice,
  },
});