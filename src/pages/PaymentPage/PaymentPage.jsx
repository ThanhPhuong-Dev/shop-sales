import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import formatNumber from '~/utils/formatNumber';

import * as Toast from '~/utils/reactToasts';
import * as OrderServices from '~/services/orderService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMutationHook } from '~/hooks/useMutationHook';
import { orderProductBuy } from '~/redux/Silde/orderProductSlice';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('GO_JEK');
  const [payment, setPayment] = useState('later_money');
  const [shippingAddress, setShippingAddress] = useState({
    fullname: '',
    address: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    setShippingAddress({
      fullname: user?.name || '',
      address: user?.address || '',
      phone: user?.phone || '',
      city: user?.city || ''
    });
  }, [user]);
  const dispatch = useDispatch();
  const accessUser = localStorage.getItem('access_token');
  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);

    return result;
  }, []);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + item.discount * item.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, []);

  const deliveryMemo = useMemo(() => {
    if (priceMemo < 100000 && priceMemo > 1) {
      return 10000;
    } else if (priceMemo > 100001 && priceMemo < 500000) {
      return 20000;
    } else if (priceMemo === 0) {
      return 0;
    } else if (priceMemo > 500001 && priceMemo < 1000000) {
      return 45000;
    } else {
      return Number(150000 + Number(priceMemo) * 0.01);
    }
  }, []);
  const checkDelivery = useMemo(() => {
    if (delivery == 'FAST') {
      return Number(deliveryMemo + 26000);
    } else {
      return Number(deliveryMemo);
    }
  }, [delivery]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountMemo) + Number(checkDelivery);
  }, [priceMemo, discountMemo, checkDelivery]);

  const handleChangeCheckbox = (e) => {
    setDelivery(e.target.value);
  };
  const mutationPayment = useMutationHook((data) => {
    const res = OrderServices.createOrder(accessUser, data);
    return res;
  });
  const ClickBuyProduct = () => {
    if (user?.name || user?.address || user?.phone || user?.city) {
      mutationPayment.mutate(
        {
          orderItems: order?.orderItemSelected,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: checkDelivery,
          totalPrice: totalPriceMemo,
          user: user?.id,
          shippingAddress: shippingAddress
        },
        {
          onSuccess: (dataSuccess) => {
            if (dataSuccess?.status == 'OK') {
              Toast.successToast({ title: 'Đặt Hàng Thành Công' });
              const orderOther = dataSuccess.data.orderItems.map((order) => {
                return order.product;
              });

              navigate('/');
              dispatch(orderProductBuy({ orderOther: orderOther }));
            }
          }
        }
      );
    }
  };

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Thanh Toán</Typography>
      <Grid container>
        <Grid item xs={9}>
          {/* Thông Tin */}
          <Box sx={{ padding: '28px 30px 24px', mb: 2, backgroundColor: 'white', boxShadow: '0px 2px 6px #ccc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: '3rem', color: '#ee4d2d' }}></LocationOnIcon>
              <Typography sx={{ color: '#ee4d2d', fontSize: '1.8rem' }}>Địa Chỉ Nhận Hàng</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& .MuiTypography-root ': {
                  fontSize: '1.6rem'
                }
              }}
            >
              <Box
                sx={{
                  width: '200px',
                  '& .MuiTypography-root ': {
                    fontWeight: 700
                  }
                }}
              >
                <Typography>{user?.name}</Typography>
                <Typography>{user?.phone}</Typography>
              </Box>
              <Box sx={{ marginLeft: '20px', flex: 1, overflow: 'hidden' }}>
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {`${user?.address} , ${user?.city}`}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ backgroundColor: 'white', padding: '28px 30px 24px', boxShadow: '0px 2px 6px #ccc', mb: 2 }}>
            {/* sản phẩm */}
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

            {/* sản phẩm */}
          </Box>

          {/* Thanh toán */}
          <Box sx={{ backgroundColor: 'white', padding: '28px 30px 24px', boxShadow: '0px 2px 6px #ccc', mb: 2 }}>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mb: 1 }}>Chọn Phương Thức Giao Hàng</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 10px',
                  background: 'rgb(240, 248, 255)',
                  border: '1px solid rgb(194, 225, 255)',
                  borderRadius: '10px'
                }}
              >
                <FormControlLabel
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                      <Typography
                        sx={{
                          color: 'red',
                          mr: 1,
                          fontSize: '1.4rem',
                          fontWeight: 600,
                          width: '70px'
                        }}
                      >
                        GO_JEK
                      </Typography>
                      Giao Hàng Tiết Kiệm
                    </Box>
                  }
                  control={<Checkbox value="GO_JEK" checked={delivery === 'GO_JEK'} onChange={handleChangeCheckbox} />}
                />
                <FormControlLabel
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                      <Typography
                        sx={{
                          color: 'red',
                          mr: 1,
                          fontSize: '1.4rem',
                          fontWeight: 600,
                          width: '70px'
                        }}
                      >
                        FAST
                      </Typography>{' '}
                      Giao Hàng Nhanh Chóng
                    </Box>
                  }
                  control={<Checkbox value="FAST" checked={delivery === 'FAST'} onChange={handleChangeCheckbox} />}
                />
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mb: 2 }}>Chọn Phương Thức Thanh Toán</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 10px',
                  background: 'rgb(240, 248, 255)',
                  border: '1px solid rgb(194, 225, 255)',
                  borderRadius: '10px'
                }}
              >
                <FormControlLabel
                  label={<Typography sx={{ fontSize: '1.4rem' }}>Thanh Toán Tiền Mặt Khi Nhận Hàng</Typography>}
                  control={
                    <Checkbox
                      defaultChecked
                      // checked={checked[0] && checked[1]}
                      // indeterminate={checked[0] !== checked[1]}
                      // onChange={handleChange1}
                    />
                  }
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              ml: 2,
              p: 2,
              width: '272px',
              backgroundColor: 'white',
              boxShadow: ' 0px -2px 12px #ccc',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              overflowY: 'auto',
              top: '110px',
              right: '172px'
            }}
          >
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiTypography-root': {
                  fontSize: '1.4rem'
                }
              }}
            >
              <Typography>Tạm Tính</Typography>
              <Typography sx={{ fontWeight: 600 }}>{priceMemo && formatNumber(priceMemo)}đ</Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiTypography-root': {
                  fontSize: '1.4rem'
                }
              }}
            >
              <Typography>Giảm Giá</Typography>
              <Typography sx={{ fontWeight: 600 }}>{discountMemo}%</Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiTypography-root': {
                  fontSize: '1.4rem'
                }
              }}
            >
              <Typography>Thuế</Typography>
              <Typography sx={{ fontWeight: 600 }}>0</Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiTypography-root': {
                  fontSize: '1.4rem'
                }
              }}
            >
              <Typography>Phí Giao Hàng</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {deliveryMemo &&
                  (delivery === 'FAST' ? formatNumber(deliveryMemo + 26000) : formatNumber(deliveryMemo))}
                đ
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                // justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mb: 1 }}>Tổng Tiền</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Typography sx={{ fontWeight: 600, color: 'red', fontSize: '2.4rem' }}>
                  {totalPriceMemo && formatNumber(totalPriceMemo)}đ
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={ClickBuyProduct}
              variant="contained"
              disableElevation
              sx={{
                mt: 3,
                background: '#ee4d2d',
                fontSize: '1.4rem',
                padding: '0 60px',
                fontWeight: 600,
                height: '50px',
                '&:hover': {
                  background: '#f05d40'
                }
              }}
            >
              Đặt Hàng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentPage;
