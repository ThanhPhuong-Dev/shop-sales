import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/register`, data);
  return res.data;
};

export const getDetailrUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
    {
      headers: {
        access_token: `Beare ${access_token}`
      }
    },
    { withCredentials: true }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axiosJWT.post(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/user/refresh-token`, {
    withCredentials: true
  });
  return res.data;
};
