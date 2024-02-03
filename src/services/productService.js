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

export const updateProduct = async (id, access_token, data) => {
  const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/update/${id}`, data, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/details/${id}`);
  return res.data;
};
