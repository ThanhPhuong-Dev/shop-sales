import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: ''
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token, avatar, phone, address } = action.payload;
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.access_token = '';
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
