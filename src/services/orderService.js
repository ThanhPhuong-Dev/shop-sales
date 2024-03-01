import axios from 'axios';
import { axiosJWT } from './userService';
export const createOrder = async (access_token, data) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/create`,
    {
      ...data
    },
    {
      headers: {
        access_token: `Beare ${access_token}`
      }
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/order-all`, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};
export const getOrderUser = async (id) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/order-user/${id}`);
  return res.data;
};

export const orderCancel = async (id) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/order/order-cancel/${id}`);
  return res.data;
};
