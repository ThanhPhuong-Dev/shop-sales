import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import StepperComponent from '~/components/StepperComponent/StepperComponent';
import formatNumber from '~/utils/formatNumber';

function PaymentSuccessPage() {
  const order = useSelector((state) => state.order);
  return (
    <Box sx={{ height: '100vh' }}>
      <StepperComponent></StepperComponent>
      <Box>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '28px 30px 24px',
            boxShadow: '0px 2px 6px #ccc',
            my: 2,
            borderRadius: '10px'
          }}
        >
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mb: 2 }}>Đơn Hàng Đang Vận Chuyển</Typography>

          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 10px',
                background: 'rgb(240, 248, 255)',
                border: '1px solid rgb(194, 225, 255)',
                borderRadius: '10px',
                mb: 2
              }}
            >
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mr: 2 }}>Phương Thức Thanh Toán</Typography>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, color: 'red' }}>{order?.delivery}</Typography>
            </Box>
          </Box>
          {order?.orderItemSelected?.map((product) => (
            <Box
              key={product.product}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                mb: 2,
                border: '1px solid #ee4d2d',
                borderRadius: '10px'
              }}
            >
              <Box sx={{ width: '50px', height: '50px', padding: '4px', border: '2px dashed #ee4d2d' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" src={product.image}></img>
              </Box>
              <Box sx={{ width: '200px', overflow: 'hidden', mx: 2 }}>
                <Typography sx={{ fontSize: '1.4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box>
                  <Typography
                    sx={{ fontSize: '1.2rem', color: '#929292', width: '150px' }}
                  >{`Loại: ${product.type}`}</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: '1.2rem', color: '#929292', width: '100px' }}
                  >{`Số Lương: ${product.amount}`}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.2rem', color: '#929292', flex: 1 }}>{`Thành Tiền: ${formatNumber(
                    product.price * product.amount
                  )}đ`}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentSuccessPage;
