var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false});

app.use(express.static('public'));

var cities = {
	'Lotopia': 'This city sucks',
	'Caspiana': 'Better than yours!',
	'Indigo': 'Uhhh..scary...'
};

app.get('/cities', function(req, res) {
	res.json(Object.keys(cities));	
});

app.post('/cities', urlencode, function(req, res) {
	var newCity = req.body;
	cities[newCity.name] = newCity.description;
	res.status(201).json(newCity.name);
})

module.exports = app;