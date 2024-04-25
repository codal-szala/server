
var mysql = require('mysql2');

var conn = mysql.createConnection({
  host:process.env.HOST,
  user: process.env.USER,
  password:process.env.PASSWORD,
  port:process.env.PORT,
  database:process.env.DATABASE,
});



module.exports = conn;