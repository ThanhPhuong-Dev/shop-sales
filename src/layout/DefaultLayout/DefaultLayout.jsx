import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      {children}
    </div>
  );
}

export default DefaultLayout;
