const { App } = require('./server/app');

const port = 3333;

(async () => {
  const app = await App();
  app.listen(port, () => {
    console.log(`Products API listening at http://localhost:${port}`);
  });
})();
