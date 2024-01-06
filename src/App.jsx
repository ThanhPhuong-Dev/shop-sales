import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes/route';
import DefaultLayout from './components/layout/DefaultLayout/DefaultLayout';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {publicRouter.map((route) => {
            const Page = route.element;
            const Layout = DefaultLayout;
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
