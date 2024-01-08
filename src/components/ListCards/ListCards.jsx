import { Box } from '@mui/material';
import CardComponent from './CardComponent/CardComponent';

function ListCards({ indexCol }) {
  return (
    <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: `repeat(${indexCol}, 1fr)`, gap: 2 }}>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
    </Box>
  );
}

export default ListCards;
