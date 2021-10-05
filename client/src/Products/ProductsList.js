import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getProducts, updateProoduct } from '../services/products';


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const currency = useSelector(store => store.currency.active);
  const quotes = useSelector(store => store.currency.quotes);
  const rate = quotes[`USD${currency}`] || 1;
  const [show, setShow] = useState({});
  const handleShow = (productId) => setShow({
    ...show,
    [productId]: true
  });
  const handleClose = (productId) => setShow({
    ...show,
    [productId]: false
  });

  const onProductChange = (prodcutId, name, price, description) => {
    updateProoduct(prodcutId, name, price, description);
    setProducts([...products].map(p => {
      if (prodcutId === p.id) {
        p.name = name;
        p.price = price;
        p.description = description;
      }
      return p;
    }));
    handleClose(prodcutId);
  }

  useEffect(()=>{
    async function fetchData() {
      const {data} = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price ({currency})</th>
          <th>Description</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          products.map(({id, name, price, description}, i)=>{
            const formattedPrice = (price * rate).toFixed(2);
            return (
              <tr key={i}>
                <td>{id}</td>
                <td>{name}</td>
                <td style={{textAlign: 'right'}}>{formattedPrice}</td>
                <td>{description}</td>
                <td>
                  <EditButton 
                    show={show[id]}
                    handleShow={()=>handleShow(id)} 
                    handleClose={()=>handleClose(id)} 
                    productName={name}
                    productPrice={price}
                    productDesc={description}
                    currency={currency}
                    rate={rate}
                    onSaveChange={onProductChange}
                    prodcutId={id }
                  />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

function EditButton({
  show, 
  handleShow, 
  handleClose, 
  prodcutId,
  productName, 
  productPrice, 
  productDesc,
  currency,
  rate,
  onSaveChange
}) {
  const [title, setTitle] = useState(productName || '');
  const [price, setPrice] = useState(productPrice || 0);
  const [description, setDescription] = useState(productDesc || '');
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter product name" 
                value={title}
                onChange={({target})=>setTitle(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price:</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">{currency}</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  placeholder="Enter product price" 
                  defaultValue={(price * rate).toFixed(2)}
                  onChange={({target})=>setPrice(Number(target.value) / rate)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter product description" 
                value={description}
                onChange={({target})=>setDescription(target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>onSaveChange(prodcutId, title, price, description)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductsList;