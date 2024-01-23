import { Box } from '@mui/material';
import CardComponent from './CardComponent/CardComponent';

function ListCards({ indexCol, productData }) {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'grid',
        gridTemplateColumns: `repeat(${indexCol}, 1fr)`,
        gap: 2
      }}
    >
      {productData?.data.map((product) => (
        <CardComponent key={product._id} product={product}></CardComponent>
      ))}
    </Box>
  );
}

export default ListCards;
