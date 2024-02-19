import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { keyframes } from '@emotion/react';
import formatNumberWithK from '~/utils/formatNumberWithK';
import formatNumber from '~/utils/formatNumber';
import { useNavigate } from 'react-router-dom';
const fadeIn = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translate(0,-6px);
  }
`;

function CardComponent({ product }) {
  const navigate = useNavigate();
  const stars = Array.from({ length: product?.rating }, (_, index) => <StarIcon key={index} />);
  const handleClickCard = () => {
    navigate(`/product-details/${product._id}`);
  };
  return (
    <Card
      onClick={handleClickCard}
      sx={{
        maxWidth: 200,
        minWidth: 170,
        height: '282px',
        cursor: 'pointer',
        boxShadow: '0px 2px 9px #ccc',
        overflow: 'visible',
        position: 'relative',
        transition: '0.5s',
        border: '1px solid white',
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
        // image="https://img.ws.mms.shopee.vn/c7db377b177fc8e2ff75a769022dcc23"
        image={product?.image}
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
            WebkitLineClamp: 1
          }}
        >
          {product?.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700, color: 'red', pt: 1 }}>
          {product && formatNumber(product?.price)}đ
          {product?.discount && (
            <Typography sx={{ ml: 1, fontSize: '1.2rem' }} variant="span">
              {product?.discount}%
            </Typography>
          )}
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
            {stars}
          </Box>
          <Typography>Đã Bán {formatNumberWithK(product?.sold)}</Typography>
        </Box>
        <Typography
          sx={{
            pt: 2,
            fontSize: '1.4rem'
          }}
        >
          {product?.location}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
