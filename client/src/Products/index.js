import CurrencySelector from './CurrencySelector';
import ProductsList from './ProductsList';

const Products = () => {
  return (
    <div className="products">
      <CurrencySelector />
      <ProductsList />
    </div>
  );
}

export default Products;
