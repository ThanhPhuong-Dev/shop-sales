import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  avatar: '',
  city: '',
  access_token: '',
  isAdmin: false,
  orderProduct: [],
  userCoin: '',
  refresh_token: ''
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token, avatar, phone, address, _id, gender, isAdmin, city, userCoin, refresh_token } =
        action.payload;

      state.id = _id;
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.gender = gender;
      state.avatar = avatar;
      state.city = city;
      state.userCoin = userCoin;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.access_token = '';
      state.isAdmin = false;
    },
    addOrderUser: (state, action) => {
      const { orderItemSelected } = action.payload;

      const otherOrderUser = [];
      orderItemSelected?.forEach((item) => {
        otherOrderUser.push(item);
      });
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, addOrderUser } = userSlide.actions;

export default userSlide.reducer;
