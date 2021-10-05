const request = require('supertest');
const { App } = require('./app');

let app;

beforeAll(async () => {
  app = await App();
});

it('should successfully respond with hello world!', async () => {
  const res = await request(app).get('/hello');
  expect(res.text).toEqual('hello world!');
});
