import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/counter/counterSlice';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Typography variant="h4" component="h2">
          {count}
        </Typography>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <Button variant="contained" onClick={() => dispatch(incrementByAmount())}>
          fsafasd
        </Button>
      </Stack>
    </div>
  );
}

export default App;
