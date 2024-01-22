import { Box, Typography } from '@mui/material';

function InputProfile({ label, id, value, type, handleChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        '& .MuiTypography-root': {
          fontSize: '1.4rem',
          fontWeight: 600
        }
      }}
    >
      <Typography>{label}</Typography>
      <input
        id={id}
        value={value}
        type={type}
        style={{ maxWidth: '400px', minWidth: '400px', outline: 'none', padding: '12px' }}
        onChange={handleChange}
      ></input>
    </Box>
  );
}

export default InputProfile;
