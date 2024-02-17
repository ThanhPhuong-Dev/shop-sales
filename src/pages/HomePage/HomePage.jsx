import { Box, Button } from '@mui/material';
import SliderComponent from '~/components/SliderComponent/SliderComponent';
import Chip from '@mui/material/Chip';
import ListCards from '~/components/ListCards/ListCards';
import { useQuery } from 'react-query';
import * as ProductService from '~/services/productService';
import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function HomePages() {
  const [limit, setLimit] = useState(12);
  const [typeProduct, setTypeProduct] = useState([]);
  useEffect(() => {
    const fetchTypeProduct = async () => {
      const res = await ProductService.typeProduct();
      setTypeProduct(res.data);
    };
    fetchTypeProduct();
  }, []);
  const fetchDataProductAll = async (context) => {
    const limitt = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getAllProduct(limitt);
    return res;
  };

  const productAll = useQuery(['product', limit], fetchDataProductAll, { retry: 3, retryDelay: 1000 });
  const { data: ProductData, isLoading } = productAll;

  return (
    <>
      {isLoading ? (
        <LoadingComponent time={2000}></LoadingComponent>
      ) : (
        <Box
          // maxWidth="lg"
          sx={
            {
              // px: 2
              // height: '100vh',
              // background: 'blue'
              // marginTop: '80px'
            }
          }
        >
          <Box sx={{ display: 'flex', padding: '0 0 10px 0', gap: 3, borderBottom: '2px solid #ccc' }}>
            {typeProduct.map((item, index) => (
              <Chip
                key={index}
                label={item}
                sx={{ fontSize: '1.4rem', color: '#27272a', cursor: 'pointer', background: '#ccc' }}
                onClick={() => {
                  console.log(item);
                }}
              ></Chip>
            ))}
          </Box>
          <SliderComponent></SliderComponent>
          <ListCards indexCol="6" productData={ProductData}></ListCards>

          {/* button loadMore Product */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2
            }}
          >
            <Button
              disabled={ProductData?.data.length === ProductData?.totalProduct}
              sx={{
                width: '400px',
                height: '40px',
                fontSize: '1.2rem'
              }}
              variant="outlined"
              onClick={() => setLimit((prev) => prev + 6)}
            >
              Xem Thêm
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default HomePages;
