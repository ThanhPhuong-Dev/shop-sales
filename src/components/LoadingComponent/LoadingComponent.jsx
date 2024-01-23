import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = ({ isLoading }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 9999
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
