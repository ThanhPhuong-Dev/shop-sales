import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InputForm from '~/components/FormAccount/InputForm/InputForm';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import * as UserServices from '../../services/userService';
import { useMutationHook } from '~/hooks/useMutationHook';
import { keyframes } from '@emotion/react';
import LowecapitalizeFirstLetterrCase from '~/utils/capitalizeFirstLetter';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/Silde/userSilde';
import * as Toast from '~/utils/reacttoasts';

const fadeLoading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function Login() {
  const navgiate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassWord, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event?.target?.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassWord = () => {
    setShowPassword((eventShowPassword) => !eventShowPassword);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const mutation = useMutationHook((data) => {
    return UserServices.loginUser(data);
  });

  const { data, isSuccess, isError, error } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navgiate(location?.state);
      } else {
        navgiate('/');
      }

      Toast.successToast({ title: 'Đăng Nhập Thành Công' });
      localStorage.setItem('access_token', data?.access_token);
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError) {
      Toast.errorToast({ title: 'Đăng Nhập Thất Bại' });
      setDataError(error.response.data.message);
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserServices.getDetailrUser(id, access_token);
    const storage = localStorage.getItem('refresh_token');
    const refreshToken = JSON.parse(storage);
    dispatch(updateUser({ ...res?.data, access_token, refresh_token: refreshToken }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };

  const handleClickRegister = () => {
    navgiate('/register');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={{
          width: '400px',
          margin: 'auto',
          background: 'white',
          boxShadow: '1px 2px 27px #ccc',
          padding: '20px 0',
          borderRadius: '10px'
        }}
      >
        <Typography variant="h4" sx={{ padding: '22px 30px' }}>
          Đăng Nhập
        </Typography>
        <Box
          sx={{
            padding: '0 30px 30px 30px'
          }}
        >
          <form
            onSubmit={handleSubmit}
            // style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <InputForm
              label="Tên Đăng Nhập"
              id="email"
              type="email"
              value={email}
              handleChange={handleEmailChange}
            ></InputForm>

            <InputForm
              label="Mật Khẩu"
              id="password"
              type={!showPassWord ? 'password' : 'text'}
              value={password}
              handleChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassWord}>
                    {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                  </IconButton>
                </InputAdornment>
              }
            ></InputForm>

            <Button
              disabled={!email?.length || !password?.length}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={handleLoading}
              sx={{
                mt: 3,
                position: 'relative',
                // padding: '12px 0',
                color: ' white',
                background: '#ee4d2d',
                fontSize: '1.6rem',
                height: '45px',
                textTransform: 'capitalize',
                fontWeight: 700,
                '&:focus': {
                  background: 'red',
                  outline: 'none'
                },
                '&:hover': {
                  background: 'red',
                  opacity: 0.7
                }
              }}
            >
              {loading ? (
                <RotateRightIcon
                  sx={{
                    color: 'white',
                    fontSize: '2.3rem',
                    animation: `${fadeLoading} 2s linear infinite`
                  }}
                ></RotateRightIcon>
              ) : (
                LowecapitalizeFirstLetterrCase('Đăng nhập')
              )}
              {dataError?.status === 'ERR' && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '103%',
                    color: 'red',
                    fontSize: '1rem'
                  }}
                >
                  {dataError.message}
                  {/* {data?.message} */}
                </span>
              )}
            </Button>
          </form>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: 2,
              '& .MuiTypography-root': {
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#3498db'
              }
            }}
          >
            <Typography>Quên Mật Khẩu</Typography>
            <Typography>Đăng Nhập SmS</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              pt: 2,
              borderTop: '1px solid #ccc',
              '& .MuiButton-root': {
                py: '12px',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#000000de'
              }
            }}
          >
            <Button variant="outlined" fullWidth startIcon={<FacebookIcon sx={{ color: '#0866ff' }}></FacebookIcon>}>
              FaceBook
            </Button>
            <Button variant="outlined" fullWidth startIcon={<GoogleIcon sx={{ color: '#e67e22' }}></GoogleIcon>}>
              Google
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '1.2rem', color: '#00000042', mr: 1 }}>Chưa có tài khoản?</Typography>
          <Typography style={{ fontSize: '1.2rem', color: '#3498db' }} onClick={handleClickRegister}>
            Tạo tài khoản
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
