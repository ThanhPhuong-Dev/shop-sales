import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counter/counterSlice';
import userReducer from './Silde/userSilde';
import productSearch from './Silde/ProductSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productSearch
  }
});
