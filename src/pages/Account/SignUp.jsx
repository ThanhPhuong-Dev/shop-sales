import { Box, IconButton, InputAdornment, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import InputForm from '~/components/FormAccount/InputForm/InputForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '../../services/userService';
import * as Toasts from '~/utils/reactToasts';
const fadeLoading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function SignUp() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassWord, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(null);
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassWord = () => {
    setShowPassword((eventShowPassword) => !eventShowPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleconfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const mutation = useMutationHook((data) => {
    return UserServices.registerUser(data);
  });
  const { data, isSuccess, isError, error } = mutation;
  console.log('mutation', mutation);

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      Toasts.successToast({ title: 'Đăng ký thành công' });
    } else if (isError) {
      setDataError(error.response.data.message);
      Toasts.errorToast({ title: `${error.response.data.message.message}` });
    }
  }, [isSuccess, isError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ email, password, confirmPassword });
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
          Đăng Ký
        </Typography>
        <Box
          sx={{
            padding: '0 30px 30px 30px'
          }}
        >
          <form onSubmit={handleSubmit}>
            <InputForm label="Email" id="email" type="text" value={email} handleChange={handleEmailChange}></InputForm>
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
            <InputForm
              label="Xác Minh lại Mật Khẩu"
              id="confirmPassword"
              type={!showPassWord ? 'password' : 'text'}
              value={confirmPassword}
              handleChange={handleconfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassWord}>
                    {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                  </IconButton>
                </InputAdornment>
              }
            ></InputForm>
            <Button
              disabled={!email || !password || !confirmPassword}
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
                'Đăng Ký'.toLowerCase()
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
                  {dataError?.message}
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
      </Box>
    </Box>
  );
}

export default SignUp;
