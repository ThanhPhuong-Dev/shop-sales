import axios from 'axios';

export const getAllProduct = async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/create`, {
    ...data
  });
  return res.data;
};
