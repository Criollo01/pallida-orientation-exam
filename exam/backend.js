'use strict'

const express = require('express');
const mysql = require('mysql');
const app = express();

app.use('/assets', express.static('./assets'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a',
  database: 'licence_plates'
});

connection.connect();

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'assets/index.html');
});



app.listen(8080, () => console.log('Server is running'));