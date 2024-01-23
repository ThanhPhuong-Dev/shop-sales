import Login from '~/pages/Account/Login';
import SignUp from '~/pages/Account/SignUp';
import AdminPage from '~/pages/AdminPage/AdminPage';
import HomePages from '~/pages/HomePage/HomePage';
import OrderPage from '~/pages/OrderPage/OrderPage';
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage';
import ProductPage from '~/pages/ProductPage/ProductPage';
import ProfileUser from '~/pages/ProfileUser/ProfileUser';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';

export const publicRouter = [
  { path: '/', element: HomePages, isShowHeader: true },
  { path: '/product', element: ProductPage, isShowHeader: true },
  { path: '/order', element: OrderPage, isShowHeader: true },
  { path: '/:type', element: TypeProductPage, isShowHeader: true },
  { path: '/product-details', element: ProductDetailPage, isShowHeader: true },
  { path: '/profile', element: ProfileUser, isShowHeader: true },
  { path: '/register', element: SignUp, isShowHeader: false },
  { path: '/login', element: Login, isShowHeader: false },
  { path: '/system/admin', element: AdminPage, isShowHeader: false, isPrivate: true }
];
