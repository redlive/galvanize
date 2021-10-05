const express = require('express');
const { connect } = require('./database');
const axios = require('axios');
const cors = require('cors');
const { productSchema } = require('./schema/product')

module.exports.App = async () => {
  const db = await connect();

  const app = express();

  const initDB = () => {
    // const sql = 'DROP TABLE products;'
    db.exec('DROP TABLE IF EXISTS products;');
    const sql = `
      CREATE TABLE IF NOT EXISTS products (id INT,name VARCHAR(50),price DECIMAL(4,2),description VARCHAR(50),cntr INT);
      insert into products (id, name, price, description, cntr) values (1, 'Juice - Ocean Spray Kiwi', 7.35, 'Crimson', 0);
      insert into products (id, name, price, description, cntr) values (2, 'Wine - Barossa Valley Estate', 19.03, 'Goldenrod', 0);
      insert into products (id, name, price, description, cntr) values (3, 'Pasta - Gnocchi, Potato', 20.66, 'Fuscia', 0);
      insert into products (id, name, price, description, cntr) values (4, 'Veal - Leg, Provimi - 50 Lb Max', 11.54, 'Orange', 0);
      insert into products (id, name, price, description, cntr) values (5, 'Carbonated Water - Wildberry', 33.94, 'Crimson', 0);
      insert into products (id, name, price, description, cntr) values (6, 'Nut - Peanut, Roasted', 37.03, 'Aquamarine', 0);
      insert into products (id, name, price, description, cntr) values (7, 'Chicken Breast Wing On', 46.33, 'Maroon', 0);
      insert into products (id, name, price, description, cntr) values (8, 'Wine - Rhine Riesling Wolf Blass', 10.0, 'Violet', 0);
      insert into products (id, name, price, description, cntr) values (9, 'Pork - Bacon,back Peameal', 15.77, 'Maroon', 0);
      insert into products (id, name, price, description, cntr) values (10, 'Bananas', 7.85, 'Aquamarine', 0);  
    `;
    db.exec(sql);
  }

  app.use(cors());
  app.use(express.json());

  initDB();

  app.get('/hello', (req, res) => {
    res.send('hello world!');
  });

  app.get('/products', (req, res) => {
    db.all("select * from products", (err, products) => products)
    .then((data = [])=>{
      res.status(200).send(JSON.stringify(data));
    })
    .catch((err)=>{
      res.status(400).send(`Error: ${err}`);
    });
  });

  app.post('/product/:id', async (req, res, next) => {
    const { id: productId } = req.params;
    const {name, price, description} = req.body;

    try {
      await productSchema.validate({name, price, description});
    } catch(err){
      next(new Error(`Validation error: ${err}`));
    }

    db.all(`
      update 
        products 
      set 
        name='${name}',
        price=${price},
        description='${description}',
        cntr = cntr + 1
      where id=${productId}
    `)
    .then((data)=>{
      res.status(200).send(JSON.stringify(data));
    })
    .catch((err)=>{
      res.status(400).send(`Error: ${err}`);
    });
  });

  app.get('/quotes', (req, res) => {
    axios.get('https://currency-api-mock.highbond-s3.com/live', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({data})=>{
      res.status(200).send(data.quotes);
    })
    .catch((err)=>{
      res.status(400).send(`Quotes Error: ${err}`);
    });
  });

  return app;
};
