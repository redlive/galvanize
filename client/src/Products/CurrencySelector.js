
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setDefaultCurrency } from '../store/actions/currency';


const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency.active);

  const onChange = (e) => {
    dispatch(setDefaultCurrency(e.target.value));
  }

  return (
    <Form.Select
      style={{width: 100}}
      aria-label="Currency selector" 
      defaultValue={currency}
      onChange={onChange}
    >
      <option value="USD">USD</option>
      <option value="CAD">CAD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </Form.Select>
  );
}

export default CurrencySelector;