import Login from '~/pages/Account/Login';
import SignUp from '~/pages/Account/SignUp';
import AdminPage from '~/pages/AdminPage/AdminPage';
import HomePages from '~/pages/HomePage/HomePage';
import OrderPage from '~/pages/OrderPage/OrderPage';
import PaymentPage from '~/pages/PaymentPage/PaymentPage';
import PaymentSuccessPage from '~/pages/PaymentSuccessPage/PaymentSuccessPage';
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage';
import ProductPage from '~/pages/ProductPage/ProductPage';
import ProfileUser from '~/pages/ProfileUser/ProfileUser';
import PurchasePage from '~/pages/PurchasePage/PurchasePage';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';

export const publicRouter = [
  { path: '/', element: HomePages, isShowHeader: true },
  { path: '/product', element: ProductPage, isShowHeader: true },
  { path: '/order', element: OrderPage, isShowHeader: true },
  { path: '/payment', element: PaymentPage, isShowHeader: true },
  { path: '/payment/success', element: PaymentSuccessPage, isShowHeader: true },
  { path: '/product/:type', element: TypeProductPage, isShowHeader: true },
  { path: '/product-details/:id', element: ProductDetailPage, isShowHeader: true },
  { path: '/profile', element: ProfileUser, isShowHeader: true },
  { path: '/purchase', element: PurchasePage, isShowHeader: true },
  { path: '/register', element: SignUp, isShowHeader: false },
  { path: '/login', element: Login, isShowHeader: false },
  { path: '/system/admin', element: AdminPage, isShowHeader: false, isPrivate: true }
];
