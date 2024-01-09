import { useState } from 'react';
import { Button, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InputForm from './InputForm/InputForm';
function FormAccountLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện xử lý đăng nhập ở đây
  };

  return (
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

        {/* <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <Input
            id="password"
            type={!showPassWord ? 'password' : 'text'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassWord}>
                  {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl> */}
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
          Đăng nhập
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
  );
}

export default FormAccountLogin;
