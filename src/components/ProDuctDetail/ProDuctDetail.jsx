import { Box, Button, Card, CardMedia, Grid, Rating, Typography } from '@mui/material';
import img1 from '~/assets/img/anh1.jpg';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as ProductServices from '~/services/productService';
import { useQuery } from 'react-query';
import formatNumber from '~/utils/formatNumber';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, orderProductBuy } from '~/redux/Silde/orderProductSlice';

function ProDuctDetail({ idProduct }) {
  const [star, setStar] = useState(2);
  const [amount, setAmount] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const styleDescription = {
    display: 'flex',
    mt: 2,
    '& .MuiTypography-root': {
      fontSize: '1.4rem',
      visibility: 'visible',
      mr: 2
    },
    '& .MuiTypography-root:nth-of-type(1)': {
      width: '18rem',
      color: '#7f8c8d'
    }
  };

  const stylePageDetails = {
    mt: 2,
    background: 'white',
    p: 4,
    borderRaduis: '10px',
    boxShadow: '2px 0px 10px #ccc'
  };
  const fetchProductDetail = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getProductDetails(id);
    setStar(res?.data.rating);
    return res;
  };
  const { data: productDetail, isLoading } = useQuery(['productDetail', idProduct], fetchProductDetail, {
    enabled: !!idProduct
  });
  console.log('productDetail', productDetail);
  const handleAddCart = () => {
    if (!user?.id) {
      navigate('/login', { state: location.pathname });
    } else {
      // orderItems: [
      //   {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: 'Product',
      //       required: true
      //     }
      //   }
      // ],
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetail?.data?.name,
            amount: amount,
            image: productDetail?.data?.image,
            price: productDetail?.data?.price,
            product: productDetail?.data?._id,
            type: productDetail?.data?.type
          }
        })
      );
    }
  };

  // console.log('productDetail', productDetail);

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleBuyNow = () => {
    dispatch(
      orderProductBuy([
        {
          name: productDetail?.data.name,
          amount: amount,
          image: productDetail?.data.image,
          price: productDetail?.data.price,
          product: productDetail?.data._id,
          type: productDetail?.data.type
        }
      ])
    );
    navigate('/payment');
  };
  return (
    <>
      {isLoading && <LoadingComponent time={2000}></LoadingComponent>}
      <Box
        sx={{
          // height: '100vh'
          bgcolor: 'white',
          pb: 3,
          px: 1,
          mt: 3,
          boxShadow: '0px -1px 7px #ccc',
          borderRadius: '10px'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5} md={5} sx={{ padding: '15px', borderRight: '1px solid #ccc' }}>
            <Card>
              <CardMedia
                sx={{
                  width: '500px',
                  height: '500px',
                  objectFit: 'contain'
                }}
                component="img"
                alt="Example Image"
                height="140"
                image={productDetail?.data?.image}
              />
            </Card>

            {/* cardItem */}
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={2.4} md={2.4}>
                <Card>
                  <CardMedia
                    sx={{
                      width: '100%',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    component="img"
                    alt="dfsdfadf"
                    image={productDetail?.data?.image}
                    preview="true"
                  />
                </Card>
              </Grid>
              <Grid item xs={2.4} md={2.4}>
                <Card>
                  <CardMedia
                    sx={{
                      width: '100%',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    component="img"
                    alt="dfsdfadf"
                    image={productDetail?.data?.image}
                    preview="true"
                  />
                </Card>
              </Grid>
              <Grid item xs={2.4} md={2.4}>
                <Card>
                  <CardMedia
                    sx={{
                      width: '100%',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    component="img"
                    alt="dfsdfadf"
                    image={productDetail?.data?.image}
                    preview="true"
                  />
                </Card>
              </Grid>
              <Grid item xs={2.4} md={2.4}>
                <Card>
                  <CardMedia
                    sx={{
                      width: '100%',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    component="img"
                    alt="dfsdfadf"
                    image={productDetail?.data?.image}
                    preview="true"
                  />
                </Card>
              </Grid>
              <Grid item xs={2.4} md={2.4}>
                <Card>
                  <CardMedia
                    sx={{
                      width: '100%',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                    component="img"
                    alt="dfsdfadf"
                    image={productDetail?.data?.image}
                    preview="true"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={7} md={7}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}
            >
              {productDetail?.data?.name}
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiTypography-root': {
                    fontSize: '1.6rem',
                    textDecoration: ' underline red',
                    color: 'red',
                    mr: 1
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.6rem',
                    color: 'yellow'
                  }
                }}
              >
                <Typography>{productDetail?.data?.rating}.0</Typography>
                <Rating
                  name="simple-controlled"
                  amount={star}
                  onChange={(event, newamount) => {
                    setStar(newamount);
                  }}
                />
              </Box>
              <Typography sx={{ px: 1, ml: 1, borderLeft: '1px solid #ccc', fontSize: '1.4rem' }}>
                Đã Bán {productDetail?.data?.sold}
              </Typography>
            </Box>

            <Box sx={{ mt: 2, background: '#fafafa', p: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'red' }}>
                {productDetail && formatNumber(productDetail?.data?.price)}đ
              </Typography>
            </Box>

            <Box sx={{ mt: 2, span: { fontSize: '1.4rem', ml: 1 } }}>
              <span>Giao Đến</span>
              <span style={{ textDecoration: ' underline', cursor: 'pointer', fontWeight: 600 }}>
                Hòa Quý Ngũ Hành Sơn TP Đà Nẵng
              </span>
              <span style={{ color: '#3498db' }}>-Đổi địa chỉ</span>
            </Box>

            <Box
              sx={{
                mt: 2,
                py: 2,
                borderTop: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                '& .MuiTypography-root': {
                  fontSize: '1.4rem'
                }
              }}
            >
              <Typography>Số Lượng</Typography>
              <Box
                sx={{
                  ml: 4,
                  display: 'flex',
                  '& .MuiButton-outlined': {
                    fontSize: '1.3rem',
                    height: '32px',
                    width: '32px',
                    p: 0,
                    border: '1px solid #ccc'
                  },
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem',
                    height: '32px',
                    width: '64px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                  }
                }}
              >
                <Button variant="outlined" onClick={handleDecrement}>
                  <RemoveIcon></RemoveIcon>
                </Button>
                <Typography>{amount}</Typography>
                <Button variant="outlined" onClick={handleIncrement}>
                  <AddIcon></AddIcon>
                </Button>
              </Box>
              <Typography sx={{ color: '#757575', ml: 2 }}>
                {productDetail?.data?.countInStock} Sản phẩm có sẵn
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 4,
                gap: 2,
                display: 'flex',
                '& .MuiButtonBase-root': {
                  fontSize: '1.4rem',
                  height: '50px'
                }
              }}
            >
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon></AddShoppingCartIcon>}
                onClick={handleAddCart}
                sx={{
                  color: '#ee4d2d',
                  background: 'rgba(255,87,34,0.1)',
                  border: '1px solid #ee4d2d',
                  '&:hover': {
                    background: 'rgba(255,197,178,.181)',
                    border: '1px solid #ee4d2d'
                  }
                }}
              >
                Thêm Vào Giỏ Hàng
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="contained"
                disableElevation
                sx={{
                  background: '#ee4d2d',
                  fontSize: '1.4rem',
                  padding: '0 60px',
                  '&:hover': {
                    background: '#f05d40'
                  }
                }}
              >
                Mua Ngay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* page 2 */}
      <Box sx={stylePageDetails}>
        <Typography variant="h4" sx={{ fontWeight: 600, background: '#fafafa', p: 1 }}>
          CHI TIẾT SẢN PHẨM
        </Typography>
        <Box sx={styleDescription}>
          <Typography>Số Lượng Hàng Đã Bán</Typography>
          <Typography>{productDetail?.data?.sold}</Typography>
        </Box>
        <Box sx={styleDescription}>
          <Typography>Sản Phẩm Còn Lại</Typography>
          <Typography>{productDetail?.data?.countInStock}</Typography>
        </Box>
        <Box sx={styleDescription}>
          <Typography>Gửi Từ</Typography>
          <Typography>{productDetail?.data?.location}</Typography>
        </Box>
      </Box>
      {/* page 3 */}
      <Box sx={stylePageDetails}>
        <Typography variant="h4" sx={{ fontWeight: 600, background: '#fafafa', p: 1 }}>
          THÔNG TIN SẢN PHẨM
        </Typography>
        <Box sx={styleDescription}>
          <Typography>Tên sản phẩm</Typography>
          <Typography>{productDetail?.data?.name}</Typography>
        </Box>
        <Box sx={styleDescription}>
          <Typography>Loại</Typography>
          <Typography>{productDetail?.data?.type}</Typography>
        </Box>
        <Box sx={styleDescription}>
          <Typography>Mô Tả</Typography>
          <Typography>{productDetail?.data?.description}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default ProDuctDetail;
