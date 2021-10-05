import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Products from './Products';
import { setQuotes } from './store/actions/currency';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    async function fetchData() {
      const { data } = await axios.get('/quotes');
      dispatch(setQuotes(data));
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>
        EUGENE VILDER
      </h1>
      <Products />
    </div>
  );
}

export default App;
