const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'mycis4375db.cjucgyawuzby.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'P1649320p!',
    database: 'nincompoopDB'
  });

  module.exports = pool;