import { Box, Button } from '@mui/material';
import SliderComponent from '~/components/SliderComponent/SliderComponent';
import Chip from '@mui/material/Chip';
import ListCards from '~/components/ListCards/ListCards';
import { useQuery } from 'react-query';
import * as ProductService from '~/services/productService';
import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const arr = ['11.1 Sale Sinh Nhật', 'Miễn Phí Gói Quà', 'điện gia dụng', 'xe cộ', 'mẹ & bé', 'nhà cửa', 'thể thao'];

function HomePages() {
  // const [loading, setLoading] = useState(false);
  // const user = useSelector((state) => state.user);
  const fetchDataProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };


  const { data: ProductData, isLoading } = useQuery(['product'], fetchDataProductAll, { retry: 3, retryDelay: 1000 });
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
            {arr.map((item, index) => (
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2
            }}
          >
            <Button
              sx={{
                width: '400px',
                height: '40px',
                fontSize: '1.2rem'
              }}
              variant="outlined"
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
