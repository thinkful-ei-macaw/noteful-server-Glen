require('dotenv').config();
// NODE_ENV, DB_URL, TEST_DB_URL  = require('./src/config');

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
  ssl: !!process.env.SSL
};