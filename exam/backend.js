'use strict'

var express = require('express');
var mysql = require('mysql');

var app = express();

app.use(express.json());

app.use(express.static('./frontend'));
app.use('/assets', express.static('./assets'));
app.use(cors());

var connection = mysql.createConnection({
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