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

connection.connect(function(err) {
  if (err) {
    console.log("Can't connect to database");
  } else { 
    console.log("Connection established");
  };
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/assets/index.html');
});

app.get('/search', function(req, res) {	
	let searchValue = Object.values(req.query);
  let data = [];
	connection.query('SELECT * FROM licence_plates WHERE plate = '
									 + searchValue, function(error, result, fields) {
    if(error) {
      console.log(error.toString());
    };
    result.forEach(function(element) {
      data.push(element.plate);
    });
    res.send(data);     
	});
});
      
app.get('/search/:brand', function(req, res) {
	let brand = req.params.car_brand;
	let data = [];
  if (req.query.car_brand) {
		let queryString = `'SELECT plate, car_brand, car_model, 
												color, year FROM licence_plates WHERE 
												car_brand ='${req.query.car_brand}'`;
  }
  connection.query(queryString, function(err, result, fileds) {
    result.forEach(function(element){
			data.push({'car_brand': element.car_brand, 'plate': element.plate, 
								'car_model': element.car_model, 'color': element.color, 
								'year': element.year});
    });
      res.send({'data': data});
	});
});

app.listen(8080, () => console.log('Server is running'));