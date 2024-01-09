import { Box, IconButton, InputAdornment, Typography, Button } from '@mui/material';
import { useState } from 'react';
import FormAccountLogin from '~/components/FormAccount/FormAccountLogin';
import InputForm from '~/components/FormAccount/InputForm/InputForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verifypassword, setVerifyPassword] = useState('');
  const [showPassWord, setShowPassword] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassWord = () => {
    setShowPassword((eventShowPassword) => !eventShowPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện xử lý đăng nhập ở đây
  };
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
        Đăng Ký
      </Typography>
      <Box
        sx={{
          padding: '0 30px 30px 30px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <InputForm
            label="Tên Đăng Nhập"
            id="username"
            type="username"
            value={username}
            handleChange={handleUsernameChange}
          ></InputForm>
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
            id="verifypassword"
            type={!showPassWord ? 'password' : 'text'}
            value={verifypassword}
            handleChange={handleVerifyPasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassWord}>
                  {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                </IconButton>
              </InputAdornment>
            }
          ></InputForm>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              padding: '12px 0',
              color: ' white',
              background: '#ee4d2d',
              fontSize: '1.2rem',
              '&:focus': {
                background: 'red'
              },
              '&:hover': {
                background: 'red',
                opacity: 0.7
              }
            }}
          >
            Đăng Ký
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
        <a style={{ fontSize: '1.2rem', textDecoration: 'none' }} href="/login">
          Đăng Nhập
        </a>
      </Box>
    </Box>
  );
}

export default SignUp;
