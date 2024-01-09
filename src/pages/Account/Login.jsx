import { Box, Typography } from '@mui/material';
import FormAccountLogin from '~/components/FormAccount/FormAccountLogin';

function Login() {
  return (
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
        <a style={{ fontSize: '1.2rem', textDecoration: 'none' }} href="/sign-up">
          Tạo tài khoản
        </a>
      </Box>
    </Box>
  );
}

export default Login;
