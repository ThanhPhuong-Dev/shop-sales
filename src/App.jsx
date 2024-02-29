import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { publicRouter } from './routes/route';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { Fragment, useEffect, useState } from 'react';
// import axios from 'axios';
// import { isJsonString } from './utils/isJsonString';
import { jwtDecode } from 'jwt-decode';
import * as UserServices from './services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/Silde/userSilde';
import { toast, ToastContainer } from 'react-toastify';
function App() {
  const [accessUser, setAccessUser] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData) {
      decoded = jwtDecode(storageData);
    }
    return { storageData, decoded };
  };

  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserServices.getDetailrUser(id, access_token);
    dispatch(updateUser({ ...res?.data, access_token }));
  };

  let isRefreshing = false;

  UserServices.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000 && !isRefreshing) {
        isRefreshing = true;
        try {
          const data = await UserServices.refreshToken();
          config.headers['access_token'] = `Bearer ${data?.access_token}`;
          localStorage.setItem('access_token', data?.access_token);
          isRefreshing = false;
          return config;
        } catch (error) {
          isRefreshing = false;
          return Promise.reject(error);
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Router>
        <ScrollToTop></ScrollToTop>
        <Routes>
          {publicRouter.map((route) => {
            const Page = route.element;
            const isCheckAuth = !route.isPrivate || user?.isAdmin;
            const Layout = route.isShowHeader ? DefaultLayout : Fragment;
            return (
              <Route
                key={route.path}
                path={isCheckAuth ? route.path : '/notFound'}
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
