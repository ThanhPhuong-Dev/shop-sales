import axios from 'axios';
// export const axiosJWT = axios.create({
//   withCredentials: true
// });
import { axiosJWT } from './userService';
export const getAllProduct = async (limit) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct?limit=${limit}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/create`,
    {
      ...data
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/update/${id}`,
    { ...data },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        access_token: `Beare ${access_token}`
      }
    }
  );
  return res.data;
};

export const removeProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/delete/${id}`, {
    headers: {
      access_token: `Beare ${access_token}`
    }
  });
  return res.data;
};
export const removeProductAll = async (data, access_token) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/delete-many`, {
    headers: {
      access_token: `Beare ${access_token}`
    },
    data
  });
  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/details/${id}`);
  return res.data;
};

export const searchProduct = async (filter) => {
  const res = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/searchProduct?filter=name&filter=${filter}`
  );
  return res.data;
};

export const typeProduct = async () => {
  const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/type-all-product`);
  return res.data;
};

export const pageTypeProduct = async (type, limit, page) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_REACT_APP_API_URL_BACKEND
    }/product/page-type-product?filter=type&filter=${type}&limit=${limit}&page=${page}`
  );
  return res.data;
};
// export const pageTypeProduct = async (type) => {
//   if (type) {
//     const res = await axios.get(
//       `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct?filter=type&filter=${type}`
//     );
//     return res.data;
//   }
// };
