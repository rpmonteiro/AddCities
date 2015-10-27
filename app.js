var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false});

app.use(express.static('public'));

//Redis Connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = require("redis").createClient(rtg.port, rtg.hostname);	
	client.auth(rtg.auth.split(":")[1]);
} else {
    var redis = redis.createClient();
}
client.select((process.env.NODE_ENV || 'development').length);
var client = redis.createClient();
//End Redis Connection

app.get('/cities', function(req, res) {
	client.hkeys('cities', function(error, names) {
		if(error) throw error;

		res.json(names);
	})
});

app.post('/cities', urlencode, function(req, res) {
	var newCity = req.body;
	client.hset('cities', newCity.name, newCity.description, function(error) {
		if(error) throw error;
		
		res.status(201).json(newCity.name);
	});
});

module.exports = app;