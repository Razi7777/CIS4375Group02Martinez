/* eslint-disable prettier/prettier */
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'mycis4375db.cjucgyawuzby.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'P1649320p!',
    database: 'nincompoopDB'
  });

// Test the database connection
pool.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

  module.exports = pool;