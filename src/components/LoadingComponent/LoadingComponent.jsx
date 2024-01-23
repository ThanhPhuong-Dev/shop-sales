import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Điều này sẽ chạy sau 10 giây
      console.log('Chạy sau 10 giây');
    }, 10000);

    // Trả về một hàm sẽ được gọi khi component unmount hoặc khi useEffect chạy lại
    return () => clearTimeout(timeoutId);
  }, []); // Thêm [] để chỉ chạy một lần khi component được mount

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
