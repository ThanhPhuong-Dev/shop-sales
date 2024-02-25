import { Container } from '@mui/material';
import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <HeaderComponent></HeaderComponent>
      <Container
        size="lg"
        sx={{
          marginTop: '70px',
          paddingTop: '8px',
          px: 0,
          minHeight: '100vh',
          paddingRight: '0px !important'
        }}
      >
        {children}
      </Container>
    </div>
  );
}

export default DefaultLayout;
