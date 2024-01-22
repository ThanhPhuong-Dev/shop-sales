import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  avatar: '',
  access_token: ''
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token, avatar, phone, address, _id, gender } = action.payload;
      state.id = _id;
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.gender = gender;
      state.avatar = avatar;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.id = '';
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
