import HomePages from '~/pages/HomePage/HomePage';
import OrderPage from '~/pages/OrderPage/OrderPage';
import ProductPage from '~/pages/ProductPage/ProductPage';
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage';

export const publicRouter = [
  { path: '/', element: HomePages },
  { path: '/product', element: ProductPage },
  { path: '/order', element: OrderPage },
  { path: '/:type', element: TypeProductPage }
];
