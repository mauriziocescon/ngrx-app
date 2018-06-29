const path = require('path');
const jsonServer = require('json-server');

// set mocks-obj to the router
const router = jsonServer.router(path.join(__dirname, './db/db.json'));

// expose router and db behind json-server
// (@{link https://github.com/typicode/lowdb})
exports.getDb = () => {
  return router.db;
};

exports.getRouter = () => {
  return router;
};
