import { Box } from '@mui/material';
import CardComponent from './CardComponent/CardComponent';

function ListCards() {
  return (
    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
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
