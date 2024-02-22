import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderProductComponent from '~/components/OrderProductComponent/OrderProductComponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '~/redux/Silde/orderProductSlice';
function OrderPage() {
  const [listChecked, setListChecked] = useState([]);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const handleChangeCheckBoxAll = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      let newListCheckAll = [];
      order?.orderItems?.forEach((item) => newListCheckAll.push(item.product));
      setListChecked(newListCheckAll);
    } else {
      setListChecked([]);
    }
  };
  const handleRemoveALl = () => {
    if (listChecked.length > 1) {
      dispatch(removeAll({ listChecked }));
      setListChecked([]);
    }
  };

  console.log('listChecked', listChecked);
  const styleTitleHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiTypography-root ': {
      fontSize: '1.4rem',
      fontWeight: 600
    }
  };
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Giỏ Hàng</Typography>

      <Grid container>
        <Grid item xs={9}>
          {/* headerAll */}
          <Grid
            container
            sx={{ p: 1, borderRadius: '10px', backgroundColor: 'white', boxShadow: ' 0px -2px 12px #ccc' }}
          >
            <Grid item xs={5}>
              <FormControlLabel
                sx={{
                  marginLeft: '0',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem',
                    fontWeight: 600
                  }
                }}
                label={`Tất Cả (${order?.orderItems?.length} Sản Phẩm )`}
                control={
                  <Checkbox
                    checked={listChecked?.length === order?.orderItems?.length}
                    onChange={handleChangeCheckBoxAll}
                  />
                }
              />
            </Grid>
            <Grid container item xs={7}>
              <Grid item xs={4} sx={styleTitleHeader}>
                <Typography sx={{}}>Đơn Giá</Typography>
              </Grid>
              <Grid item xs={3} sx={styleTitleHeader}>
                <Typography>Số Lượng</Typography>
              </Grid>
              <Grid item xs={4} sx={styleTitleHeader}>
                <Typography>Thành Tiền</Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeft: '1px solid #ccc',
                  '& .MuiSvgIcon-root ': {
                    fontSize: '2rem'
                  }
                }}
              >
                <IconButton aria-label="delete" onClick={handleRemoveALl}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* headerAll end*/}
          {order?.orderItems?.map((item) => (
            <OrderProductComponent
              key={item.product}
              orderItem={item}
              listChecked={listChecked}
              setListChecked={setListChecked}
            ></OrderProductComponent>
          ))}
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              ml: 2,
              p: 2,
              backgroundColor: 'white',
              boxShadow: ' 0px -2px 12px #ccc',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column'
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
              <Typography>Giảm Giá</Typography>
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
              <Typography sx={{ fontWeight: 600 }}>0</Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center'
                // justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: '1.4rem' }}>Tổng Tiền</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Typography sx={{ fontWeight: 600, color: 'red', fontSize: '2.4rem' }}>40.000.000đ</Typography>
              </Box>
            </Box>
            <Button
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
              Mua Ngay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderPage;
