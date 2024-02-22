import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],

  shippingAddress: {},

  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAl: '',
  isdelivered: false,
  deliveredAt: ''
};

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state?.orderItems.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;

      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      itemOrder.amount--;
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);

      state.orderItems = itemOrder;
    },
    removeAll: (state, action) => {
      const { listChecked } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
      state.orderItems = itemOrder;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAll } =
  orderProductSlice.actions;

export default orderProductSlice.reducer;
