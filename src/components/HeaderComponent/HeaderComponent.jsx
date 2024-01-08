import logo from '~/assets/img/logo.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function HeaderComponent() {
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
            // flex: 1,
            // maxWidth: '20%',
            display: 'flex',
            // justifyContent: 'space-around',
            gap: 3
          }}
        >
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
            <Typography variant="inherit">Tài Khoản</Typography>
          </Box>
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
