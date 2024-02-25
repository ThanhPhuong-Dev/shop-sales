import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import TabPanelComponent from './TabPanelComponent/TabPanelComponent';
import PurchaseChildren from './PageChildren/PurchaseChildren';
import { useQuery } from 'react-query';
import * as OrderServices from '~/services/orderService';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
function TabsComponent() {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderUser = (context) => {
    console.log('context', context);
    const queryId = context.queryKey[1];
    const res = OrderServices.getOrderUser(queryId);
    return res;
  };
  const orderUser = useQuery(['order-user', user?.id], fetchOrderUser);
  // console.log('orderUser', orderUser?.data?.totalOrderUser.length);
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất Cả" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanelComponent value={value} index={0}>
        {orderUser.status === 'success' &&
          (orderUser?.data?.totalOrderUser.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                height: '90vh',
                '& .MuiTypography-root': { fontSize: '1.6rem' }
              }}
            >
              <Typography>Chưa Có Đơn Hàng</Typography>
            </Box>
          ) : (
            orderUser?.data?.totalOrderUser.map((product) => (
              <PurchaseChildren key={product.id} product={product}></PurchaseChildren>
            ))
          ))}
      </TabPanelComponent>
      <TabPanelComponent value={value} index={1}>
        fsafasf222
      </TabPanelComponent>
      <TabPanelComponent value={value} index={2}>
        fsafasf333
      </TabPanelComponent>
    </Box>
  );
}

export default TabsComponent;
