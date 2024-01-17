import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormAccountLogin from '~/components/FormAccount/FormAccountLogin';

function Login() {
  const navgiate = useNavigate();

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
        <FormAccountLogin></FormAccountLogin>
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
