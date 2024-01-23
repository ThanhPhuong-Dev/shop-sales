import axios from 'axios';

export const getAllProduct = async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct`);
  return res.data;
};