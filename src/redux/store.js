import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter/counterSlice';
import userReducer from './Silde/userSilde';
export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
