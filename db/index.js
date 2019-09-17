require('dotenv').config();

const pg = require('pg');
// pick variable from .env

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
// how to reach to my database
// construct our connection string

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

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
