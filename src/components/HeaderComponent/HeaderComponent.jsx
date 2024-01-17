import logo from '~/assets/img/logo.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cutTheFirstLetter from '../../utils/cutTheFirstLetter';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
function HeaderComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const hadnleClickUser = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: '70px',
        width: '100%',
        backgroundColor: '#34495e',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <a href="/">
            <Box
              sx={{
                width: '70px',
                height: '70px',
                '& img': {
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              <img src={logo}></img>
            </Box>
          </a>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: '#cca77f',
              fontFamily: 'Rubik Maps'
            }}
          >
            PHUONG
          </Typography>
        </Box>

        {/* search */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            maxWidth: '50%',

            '& .MuiTextField-root': {
              bgcolor: 'white',
              outline: 'none',
              borderRadius: '5px 0 0 5px',
              fontSize: '2rem',
              '&:focus': {
                outline: 'none',
                border: 'none',
                color: 'red'
              },

              '& .MuiInputLabel-root': {
                color: '#95a5a6',
                fontSize: '1.4rem'
              },
              '& .MuiInputBase-root': {
                fontSize: '1.4rem'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                color: 'blue',
                border: '1px'
              }
            }
          }}
        >
          <TextField size="small" fullWidth id="outlined-search" label="Search Product" type="search" />
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#f57224',
              color: 'white',
              borderRadius: '0 5px 5px 0',

              '&:hover': {
                background: '#cca77f'
              },
              '& .MuiSvgIcon-root': {
                fontSize: '2.5rem'
              }
            }}
          >
            <SearchIcon />
          </Button>
        </Box>

        {/* Action */}
        <Box
          sx={{
            flex: 1,
            maxWidth: '20%',
            display: 'flex',
            justifyContent: 'space-around',
            gap: 3
          }}
        >
          {user?.name ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #95a5a6',
                px: 2,
                gap: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: '0.5s',
                height: '37px',
                minWidth: '150px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                '&:hover': {
                  background: '#cca77f'
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '3rem',
                  color: 'white'
                },
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  color: 'white'
                }
              }}
            >
              {user?.image ? (
                <Avatar alt="Remy Sharp" src={user?.image} />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: '#ef6c00',
                    width: '30px',
                    height: '30px',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  {cutTheFirstLetter(user?.name)}
                </Avatar>
              )}
              <Typography
                variant="inherit"
                sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 600 }}
              >
                {capitalizeFirstLetter(user?.name)}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #95a5a6',
                px: 2,
                gap: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: '0.5s',

                '&:hover': {
                  background: '#cca77f'
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '3rem',
                  color: 'white'
                },
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  color: 'white'
                }
              }}
            >
              <PersonIcon></PersonIcon>
              <Typography variant="inherit" onClick={hadnleClickUser}>
                Tài Khoản
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: '3rem',
                color: 'white',
                cursor: 'pointer'
              }}
            ></ShoppingCartIcon>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeaderComponent;
