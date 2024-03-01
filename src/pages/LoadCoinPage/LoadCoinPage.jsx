import { Avatar, Box, Button, FormControl, Grid, Input, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import * as Toast from '~/utils/notification';
import { updateUser } from '~/redux/Silde/userSilde';
import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';
import ProfileUserGrid3 from '~/components/ProfileUserGrid3/ProfileUserGrid3';
import formatNumber from '~/utils/formatNumber';
function LoadCoinPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [voucher, setVoucher] = useState('');
  const [coin, setCoin] = useState('');
  const userId = user?.id;
  const useAccess = localStorage.getItem('access_token');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };
  const handleCoinChange = (e) => {
    setCoin(e.target.value);
  };

  const mutationCoin = useMutationHook((data) => {
    const res = UserServices.loadCoinUser(userId, useAccess, data);
    return res;
  });
  const { data, isSuccess, isError, isLoading } = mutationCoin;
  useEffect(() => {
    if (data?.status === 'OK') {
      Toast.successToast({ title: 'Nạp tiền thành công' });
      setErrorMessage('');
    } else if (data?.status === 'ERR') {
      setErrorMessage(data?.message);
      Toast.errorToast({ title: 'Nạp tiền không thành công' });
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutationCoin.mutate({ voucher, coin });
  };
  return (
    <Grid container spacing={2} py={2} sx={{ height: '700px' }}>
      {/* {isLoading && <LoadingComponent time={2500}></LoadingComponent>} */}
      <ProfileUserGrid3 user={user}></ProfileUserGrid3>
      <Grid item xs={9} md={9} sx={{ backgroundColor: 'white' }}>
        <Box
          sx={{
            paddingBottom: '18px',
            borderBottom: '2px solid #ccc',
            '& .MuiTypography-root': {
              fontSize: '1.5rem'
            }
          }}
        >
          <Typography>
            Tài khoản của tôi :
            <Typography variant="span" sx={{ color: 'red', fontWeight: 600 }}>
              {user?.userCoin ? `${formatNumber(user?.userCoin)}đ` : '0đ'}
            </Typography>
          </Typography>
          <Typography variant="p" sx={{ mt: 2 }}>
            Nạp tài khoản bằng mã voucher
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <InputComponent
              label="Nhập mã Voucher"
              id="voucher"
              value={voucher}
              type="text"
              handleChange={handleVoucherChange}
              width="450px"
            ></InputComponent>
            <InputComponent
              label="Nhập số tiền nạp"
              id="coin"
              value={coin}
              type="text"
              handleChange={handleCoinChange}
              width="450px"
            ></InputComponent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 2,
                '& .MuiButton-root': {
                  fontSize: '1.4rem',
                  backgroundColor: '#d35400'
                }
              }}
            >
              {errorMessage && <Typography sx={{ fontSize: '1.2rem', color: 'red' }}>{errorMessage}</Typography>}
              <Button variant="contained" type="submit">
                Nạp Tiền
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoadCoinPage;
