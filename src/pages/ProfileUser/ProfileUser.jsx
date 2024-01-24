import { Avatar, Box, Button, FormControl, Grid, Input, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import RadioProfile from './RadioProfile/RadioProfile';

function ProfileUser() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [address, setAddress] = useState(user?.address);
  const [gender, setGender] = useState(user?.gender);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = user?.id;
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
    setAddress(user?.address);
    setGender(user?.gender);
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Giảm độ phân giải của ảnh
          const targetWidth = 100;
          const targetHeight = (img.height / img.width) * targetWidth;

          // Giảm kích thước hình ảnh
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Vẽ lại hình ảnh trên canvas
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Nén ảnh mạnh hơn
          const compressedImageData = canvas.toDataURL('image/jpeg', 0.5); // Đặt chất lượng thấp hơn (0.1 đến 1)
          const compactAvatarData = compressedImageData.replace(/\s/g, '');
          // Lưu dữ liệu vào trạng thái
          setAvatar(compactAvatarData);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const mutation = useMutationHook((data) => {
    return UserServices.updateUser(userId, data);
  });
  const { isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    } else if (isError) {
      setErrorMessage(error.response.data.message);
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, email, phone, avatar, address, gender });
  };
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={3} md={3} borderRight="2px solid #ccc">
        <Typography variant="h5">Thông Tin Người Dùng</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            '& .MuiAvatar-root': {
              bgcolor: '#ef6c00',
              width: '50px',
              height: '50px',
              fontWeight: 700,
              fontSize: '1.5rem',
              textAlign: 'center',
              mr: 2
            }
          }}
        >
          {user?.avatar ? (
            <Avatar alt="Remy Sharp" src={user?.avatar} />
          ) : (
            <Avatar>{cutTheFirstLetter(user?.name)}</Avatar>
          )}
          <Typography
            sx={{
              fontSize: '1.8rem',
              fontWeight: 600,
              overflow: 'hidden',
              whiteSpace: 'normal' /* Ngăn chữ xuống dòng */,
              textOverflow: 'ellipsis'
            }}
          >
            {user?.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={9} md={9}>
        <Box
          sx={{
            paddingBottom: '18px',
            borderBottom: '2px solid #ccc',
            '& .MuiTypography-root': {
              fontSize: '1.5rem'
            }
          }}
        >
          <Typography>Hồ Sơ Của Tôi</Typography>
          <Typography variant="p" sx={{ mt: 2 }}>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={8} md={8}>
              <InputComponent
                label="Tên Người Dùng"
                id="name"
                value={name}
                type="text"
                handleChange={handleNameChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Email"
                id="email"
                value={email}
                type="text"
                handleChange={handleEmailChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Số Điện Thoại"
                id="phone"
                value={phone}
                type="text"
                handleChange={handlePhoneChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Địa chỉ"
                id="address"
                value={address}
                type="text"
                handleChange={handleAddressChange}
                width="400px"
              ></InputComponent>

              <RadioProfile name="Gender" value={gender} handleChange={handleGenderChange}></RadioProfile>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: '#ef6c00',
                  px: 2,
                  fontSize: '1.4rem',
                  textTransform: 'capitalize'
                }}
              >
                Lưu
              </Button>
              {errorMessage?.status === 'ERR' && (
                <span style={{ color: 'red', fontSize: '1.3rem', fontWeight: 500, marginLeft: '10px' }}>
                  {errorMessage?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={4} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 2,
                    '& .MuiAvatar-root': {
                      bgcolor: '#ef6c00',
                      width: '100px',
                      height: '100px',
                      fontWeight: 700,
                      fontSize: '5rem',
                      textAlign: 'center'
                    }
                  }}
                >
                  {avatar ? (
                    <Avatar alt="Selected Image" src={avatar} />
                  ) : user?.avatar ? (
                    <Avatar alt="Remy Sharp" src={user?.avatar} />
                  ) : (
                    <Avatar>{cutTheFirstLetter(user?.name)}</Avatar>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ px: 2, fontSize: '1.4rem', textTransform: 'capitalize' }}
                >
                  Chọn Ảnh
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileUser;
