import axios from 'axios';

export const createOrder = async (access_token, data) => {
  const res = await axios.post(
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
