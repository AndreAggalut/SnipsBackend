const pg = require('pg');

require('dotenv').config();
// pick variable from .env

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
// how to reach to my database
// construct our connection string

const connectionString = `postgreql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
const pool = new pg.Pool({ connectionString });

module.exports = pool;

// open a single connection to the database
// pool.connect();
// pool
//   .query('SELECT * FROM snippet')
//   .then(result => {
//     console.table(result.rows);
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   .finally(() => {
//     pool.end();
//   });
