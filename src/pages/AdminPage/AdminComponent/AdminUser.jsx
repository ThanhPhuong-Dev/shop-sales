import { Box, Button, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableComponent from '~/components/TableComponent/TableComponent';

function AdminUser() {
  return (
    <Box sx={{ pt: 5 }}>
      <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
        Quản Lý Người Dùng
      </Typography>
      <Button sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }}>
        <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
      </Button>
      <TableComponent></TableComponent>
    </Box>
  );
}

export default AdminUser;
