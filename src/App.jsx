import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes/route';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
// import { isJsonString } from './utils/isJsonString';
import { jwtDecode } from 'jwt-decode';
import * as UserServices from './services/userService';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/Silde/userSilde';

function App() {
  let StorageRefresh = 
  useEffect(() => {
    UserServices.refreshToken();
  }, []);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const { storageData, decoded } = handleDecoded();
  //   if (decoded?.id) {
  //     handleGetDetailUser(decoded?.id, storageData);
  //   }
  // }, []);

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem('access_token');
  //   let storageRefresh = localStorage.getItem('refresh_token');
  //   let decoded = {};
  //   if (storageData) {
  //     decoded = jwtDecode(storageData);
  //   }
  //   return { storageData, decoded };
  // };

  // UserServices.axiosJWT.interceptors.request.use(
  //   function async(config) {
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();
  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       const data = UserServices.refreshToken();
  //       config.headers['access_token'] = `Beare ${data?.access_token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );

  // const handleGetDetailUser = async (id, access_token) => {
  //   const res = await UserServices.getDetailrUser(id, access_token);
  //   dispatch(updateUser({ ...res?.data, access_token }));
  // };

  return (
    <div>
      <Router>
        <Routes>
          {publicRouter.map((route) => {
            const Page = route.element;
            const Layout = route.isShowHeader ? DefaultLayout : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
