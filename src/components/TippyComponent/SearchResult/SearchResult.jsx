import { Box, Typography } from '@mui/material';
import formatNumber from '~/utils/formatNumber';
function SearchResult({ product }) {
  return (
    <Box
      sx={{
        background: 'white',
        p: 1,
        display: 'flex',
        cursor: 'pointer',
        transition: '0,5s',
        '&:hover': {
          background: '#ecf0f1'
        }
      }}
    >
      <Box sx={{ width: '50px', height: '50px', overflow: 'hidden', mr: 2 }}>
        <img src={product?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.4 }}>{product?.name}</Typography>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.4, color: 'red' }}>
          {formatNumber(product?.price)}đ
        </Typography>
      </Box>
    </Box>
  );
}

export default SearchResult;