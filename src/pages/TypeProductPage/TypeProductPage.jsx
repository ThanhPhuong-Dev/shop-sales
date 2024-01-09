import { Box, Container } from '@mui/material';
import ListCards from '~/components/ListCards/ListCards';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';
import Pagination from '@mui/material/Pagination';
const data = {
  category: [
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp',
      title: 'Đồ Chơi Mẹ Và Bé'
    },
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp',
      title: 'Điện Thoại'
    },
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/1e/8c/08/d8b02f8a0d958c74539316e8cd437cbd.png.webp',
      title: 'Food'
    },
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp',
      title: 'Mỹ Phẩm Là Đẹp'
    },
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/d6/7f/6c/5d53b60efb9448b6a1609c825c29fa40.png.webp',
      title: 'Shoes'
    },
    {
      img: 'https://salt.tikicdn.com/cache/100x100/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png.webp',
      title: 'Dress'
    }
  ]
};
function TypeProductPage() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <NavBarComponent label="Danh Mục" datas={data}></NavBarComponent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ListCards indexCol="5"></ListCards>
        <Pagination
          count={10}
          variant="outlined"
          color="secondary"
          size="large"
          sx={{
            my: 2,
            textAlign: 'center'
          }}
        />
      </Box>
    </Box>
  );
}

export default TypeProductPage;
