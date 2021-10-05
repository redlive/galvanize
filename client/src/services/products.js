import axios from 'axios';

const getProducts = async () =>{
  try {
    const list = await axios.get('/products');
    return list;
  } catch(err){
    new Error('Get Products service error:', err);
  }
};

const updateProoduct = async (id, name, price, description) =>{
  try {
    await axios.post(`/product/${id}`, {
      name, price, description
    });
  } catch(err){
    new Error('Update Product service error:', err);
  }
};


export {
  getProducts,
  updateProoduct
};