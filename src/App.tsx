import './App.css'
import bookAPI from './redux/apis/bookAPI';
import counterSlice, { counterSelect } from './redux/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {

  const dispatch = useAppDispatch();
  const value = useAppSelector(counterSelect)
  const {data} = bookAPI.useGetBooksQuery()
  console.log(value, 'mydata', data);

  return (
    <>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>inc</button>
      {value}
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>dec</button>
    </>
  )
}

export default App
