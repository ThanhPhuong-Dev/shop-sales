import { Box, Typography } from '@mui/material';

function TabPanelComponent({ value, index, children }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      //   {...other}
    >
      {value == index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}
export default TabPanelComponent;
