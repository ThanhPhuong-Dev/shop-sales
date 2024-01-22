import { Container } from '@mui/material';
import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <Container size="lg" sx={{ marginTop: '80px', paddingTop: '8px', background: '#ffffff', px: 0 }}>
        {children}
      </Container>
    </div>
  );
}

export default DefaultLayout;
