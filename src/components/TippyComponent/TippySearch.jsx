import { Box, Typography } from '@mui/material';
import SearchResult from './SearchResult/SearchResult';

function TippySearch({ resultSearch }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        maxHeight: 'min((100vh - 96px) - 60px, 734px)',
        minHeight: '100px',
        py: 1,
        borderRadius: '8px',
        boxShadow: '1px 1px 1px #ccc'
      }}
    >
      {resultSearch?.map((product) => (
        <SearchResult key={product._id} product={product}></SearchResult>
      ))}
    </Box>
  );
}

export default TippySearch;
