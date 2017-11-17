'use strict'

let url = "http://localhost:8080";
const tableElement = document.querySelector('table');
const button = document.querySelector('button');
const policeButton = document.querySelector('.police');
const diplomatButton = document.querySelector('.diplomat');
const inputField = document.querySelector('input');
const urlSearch = 'http://localhost:8080/search';


function ajax (method, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function() {
  console.log(xhr.responseText);
    callback(xhr.responseText);
  };
  xhr.send();
};

function listAllData(response) {
  let information = JSON.parse(response);
  information.data.forEach(element => {
    let tableData = '<tr><td>' + element.plate + 
                    '</td><td>' + element.car_brandl + 
                    '</td><td>' + element.car_model + 
                    '</td><td>' + element.color + 
                    '</td><td>' + element.year + 
                    '</td></tr>';
    tableElement.innerHTML += tableData;
  });
}

button.addEventListener('click', function () {
	url += inputField.value;
	console.log(url);
  ajax('GET', url, listAllData);
});