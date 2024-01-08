import { Box } from '@mui/material';
import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <Box sx={{ marginTop: '80px' }}>{children}</Box>
    </div>
  );
}

export default DefaultLayout;
