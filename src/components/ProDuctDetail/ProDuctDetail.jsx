import { Box, Button, Card, CardMedia, Grid, Rating, Typography } from '@mui/material';
import img1 from '~/assets/img/anh1.jpg';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function ProDuctDetail() {
  const [star, setStar] = useState(2);
  const [value, setValue] = useState(1);

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  return (
    <Box
      sx={{
        // height: '100vh'
        pb: 3
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5} md={5} sx={{ padding: '15px', borderRight: '1px solid #ccc' }}>
          <Card>
            <CardMedia
              sx={{
                width: '500px',
                height: '500px',
                objectFit: 'cover'
              }}
              component="img"
              alt="Example Image"
              height="140"
              image={img1}
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
                  image="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjep938o831c1"
                  preview
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
                  image="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjep938o831c1"
                  preview
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
                  image="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjep938o831c1"
                  preview
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
                  image="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjep938o831c1"
                  preview
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
                  image="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjep938o831c1"
                  preview
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
            Máy massage chân bấm huyệt Xiaomi XGEEK F3, máy massage chân 360 độ, thư giãn, trị liệu giảm mệt mỏi - BH 12
            tháng
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
              <Typography>5.0</Typography>
              <Rating
                name="simple-controlled"
                value={star}
                onChange={(event, newValue) => {
                  setStar(newValue);
                }}
              />
            </Box>
            <Typography sx={{ px: 1, ml: 1, borderLeft: '1px solid #ccc', fontSize: '1.4rem' }}>
              Đã Bán 1000+
            </Typography>
          </Box>

          <Box sx={{ mt: 2, background: '#fafafa', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'red' }}>
              200.000.000đ
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
              <Typography>{value}</Typography>
              <Button variant="outlined" onClick={handleIncrement}>
                <AddIcon></AddIcon>
              </Button>
            </Box>
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
  );
}

export default ProDuctDetail;
