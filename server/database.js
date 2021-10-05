const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { SqlLite } = require('./configuration');

module.exports.connect = () => open({
  filename: SqlLite.filename,
  driver: sqlite3.Database,
});
