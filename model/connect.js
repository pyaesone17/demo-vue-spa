var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '2451994',
  database : 'express'
});

connection.connect();

module.exports = connection;