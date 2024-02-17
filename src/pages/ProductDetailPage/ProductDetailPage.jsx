import { useParams } from 'react-router-dom';
import ProDuctDetail from '~/components/ProDuctDetail/ProDuctDetail';

const ProductDetailPage = () => {
  const { id: idProduct } = useParams();
  return (
    <div>
      <h4>Trang Chủ - Chi tiết sản phẩm</h4>
      <ProDuctDetail idProduct={idProduct}></ProDuctDetail>
    </div>
  );
};

export default ProductDetailPage;
