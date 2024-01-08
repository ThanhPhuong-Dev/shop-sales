import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translate(0,-6px);
  }
`;

function CardComponent() {
  return (
    <Card
      sx={{
        maxWidth: 200,
        height: '282px',
        cursor: 'pointer',
        boxShadow: '0px 2px 9px #ccc',
        overflow: 'visible',
        position: 'relative',
        transition: '0.5s',
        '&:hover': {
          animation: `${fadeIn} 0.5s linear forwards`,
          border: '1px solid red'
        }
      }}
    >
      <Box
        sx={{
          width: '46px',
          height: '18px',
          position: 'absolute',
          top: 0,
          left: '-3px'
        }}
      >
        <img
          src="https://down-vn.img.susercontent.com/file/76c36bd87ff2eb5887d9ad3516111869"
          style={{
            width: '100%',
            height: '100%'
          }}
        ></img>
      </Box>

      <CardMedia
        sx={{
          height: 140
        }}
        image="https://img.ws.mms.shopee.vn/c7db377b177fc8e2ff75a769022dcc23"
        title="green iguana"
      />
      <CardContent sx={{ p: 1, paddingBottom: '8px !important' }}>
        <Typography
          sx={{
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1.4rem',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2
          }}
        >
          Huaqoo dép sandal nữ giày sandal nữ dép đế cao Đệm êm Thể thao và thời trang Độn đế Thời thượng FDL2410247
          1Z240103
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700, color: 'red', pt: 1 }}>
          2.000.000.000đ
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 1
          }}
        >
          <Box
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.4rem',
                color: 'yellow'
              },
              '& .MuiTypography-root': {
                fontSize: '1.4rem'
              }
            }}
          >
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
          </Box>
          <Typography>Đã Bán 5.4k</Typography>
        </Box>
        <Typography
          sx={{
            pt: 1,
            fontSize: '1.4rem'
          }}
        >
          Hà Nội
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
