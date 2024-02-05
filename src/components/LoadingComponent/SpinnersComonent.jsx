// import { CSSProperties } from 'react';
import { red } from '@mui/material/colors';
import ClipLoader from 'react-spinners/ClipLoader';

// const override: CSSProperties = ;
function SpinnersComonent({ loading }) {
  return (
    <ClipLoader
      color={red}
      loading={loading}
      cssOverride={{
        display: 'block',
        margin: '0 auto',
        borderColor: 'red'
      }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default SpinnersComonent;
