import { Box, Container } from '@mui/material';
import ListCards from '~/components/ListCards/ListCards';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';
import Pagination from '@mui/material/Pagination';
import CardComponent from '~/components/ListCards/CardComponent/CardComponent';
import { useLocation } from 'react-router-dom';
import * as ProductServices from '~/services/productService';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';

function TypeProductPage() {
  const location = useLocation();
  
  const [arrProduct, setArrProduct] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 3,
    page: 0
  });
  const fetchTypeProduct = async (context) => {
    const typeProduct = context?.queryKey[2];
    const limitProduct = context?.queryKey[1].limit;
    const pageProduct = context?.queryKey[1].page;
    const res = await ProductServices.pageTypeProduct(typeProduct, limitProduct, pageProduct);
    if (res?.status === 'OK') {
      setArrProduct(res?.data);
    }
    return res;
  };

  const fetchQueryType = () => {
    const res = ProductServices.typeProduct();
    return res;
  };

  const queryType = useQuery(['type'], fetchQueryType);
  const { data: typeData } = queryType;

  const queryProductType = useQuery(['product-type', pagination, location?.state], fetchTypeProduct, {
    retry: 3,
    retryDelay: 1000
  });
  const { data: typeProductData, isLoading } = queryProductType;
  console.log('queryProductType', queryProductType);
  const handleChangePage = (e, pageCurrnet) => {
    setloading(true);
    setPagination({
      ...pagination,
      // type: location?.state,
      limit: 3,
      page: pageCurrnet - 1
    });
    setTimeout(() => {
      setloading(false);
    }, 1500);
  };

  return (
    <>
      {(isLoading || loading) && <LoadingComponent time={1000}></LoadingComponent>}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <NavBarComponent label="Danh Mục" datas={typeData?.data}></NavBarComponent>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 'calc( 100vh - 80px )',
            marginLeft: '216px',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 2
            }}
          >
            {arrProduct?.map((product) => (
              <CardComponent key={product?._id} product={product}></CardComponent>
            ))}
          </Box>
          <Pagination
            count={typeProductData?.totalPage}
            variant="outlined"
            color="secondary"
            size="large"
            page={Number(pagination?.page + 1)}
            onChange={handleChangePage}
            sx={{
              my: 2,
              textAlign: 'center'
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default TypeProductPage;
