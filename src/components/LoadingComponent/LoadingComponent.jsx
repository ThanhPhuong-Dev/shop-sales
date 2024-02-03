import { Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const LoadingComponent = ({ time }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, time); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once

  return visible ? (
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
  ) : null;
};

export default LoadingComponent;
