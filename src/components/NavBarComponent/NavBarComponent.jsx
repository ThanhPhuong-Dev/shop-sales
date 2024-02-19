import { Box, Checkbox, Chip, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
function NavBarComponent({ label, datas }) {
  const navigate = useNavigate();
  const handleClickType = (e) => {
    const typeName = e.target.innerText;
    console.log('e', e.target.innerText);
    navigate(`product/${typeName}`, { replace: true });
  };
  const handleClick = () => {
    console.log('clickme');
  };
  return (
    <Box
      sx={{
        width: '200px',
        backgroundColor: '#ccc',
        padding: '12px 8px',
        borderRadius: '5px',
        overflowY: 'auto',
        position: 'fixed',
        height: 'calc( 100vh - 80px )'
      }}
    >
      <h2
        style={{
          margin: '0 0 8px 0',
          paddingLeft: '16px'
        }}
      >
        {label}
      </h2>

      {/* category */}
      {datas?.map((data, index) => (
        <Box
          onClick={handleClickType}
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '7px 8px',
            cursor: 'pointer',
            borderRadius: '10px',
            '&:hover': {
              background: '#27272a1f'
            },

            '& .MuiTypography-root': {
              fontSize: '1.4rem'
            }
          }}
        >
          <Box
            sx={{
              width: '32px',
              height: '32px',
              overflow: 'hidden',
              mr: '15px'
            }}
          >
            <img src={data.img} style={{ width: '100%', height: '100%' }}></img>
          </Box>
          <Typography>{data}</Typography>
        </Box>
      ))}
      {/* <h2
        style={{
          margin: '10px 0 8px 0',
          paddingLeft: '16px'
        }}
      >
        Dịch Vụ
      </h2>
      <FormGroup
        sx={{
          padding: '0 6px',
          '& .MuiTypography-root': {
            fontSize: '1.4rem'
          },
          '& .PrivateSwitchBase-input': {
            fontSize: '1.4rem'
          }
        }}
      >
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup> */}

      <h2
        style={{
          margin: '10px 0 8px 0',
          paddingLeft: '16px'
        }}
      >
        Đánh Giá
      </h2>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            mr: 1,
            '& .MuiSvgIcon-root': {
              fontSize: '1.4rem',
              color: 'yellow'
            }
          }}
        >
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
        </Box>

        <Typography
          sx={{
            fontSize: '1.4rem'
          }}
        >
          từ 5 sao
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            mr: 1,
            '& .MuiSvgIcon-root': {
              fontSize: '1.4rem',
              color: 'yellow'
            }
          }}
        >
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarBorderIcon></StarBorderIcon>
        </Box>

        <Typography
          sx={{
            fontSize: '1.4rem'
          }}
        >
          từ 4 sao
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            mr: 1,
            '& .MuiSvgIcon-root': {
              fontSize: '1.4rem',
              color: 'yellow'
            }
          }}
        >
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarIcon></StarIcon>
          <StarBorderIcon></StarBorderIcon>
          <StarBorderIcon></StarBorderIcon>
        </Box>

        <Typography
          sx={{
            fontSize: '1.4rem'
          }}
        >
          từ 3 sao
        </Typography>
      </Box>

      <h2
        style={{
          margin: '10px 0 8px 0',
          paddingLeft: '16px'
        }}
      >
        Giá
      </h2>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          '& .MuiChip-label': {
            fontSize: '1.2rem'
          }
        }}
      >
        <Chip label="400.00d" onClick={handleClick} />
        <Chip label="40.000 -> 160.000" onClick={handleClick} />
        <Chip label="160.000 -> 360.000" onClick={handleClick} />
        <Chip label="Trên 360.000" onClick={handleClick} />
      </Box>
    </Box>
  );
}

export default NavBarComponent;
