import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes/route';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = async () => {
  //   const res = await await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/product/getAllProduct`);
  //   // .then((res) => res.data);

  //   return res.data;
  // };
  // const query = useQuery({ queryKey: 'productAll', queryFn: fetchApi });

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
