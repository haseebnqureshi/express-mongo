
// config
process.env.MONGO_CONNECTION_URL = 'mongodb://localhost:27017/api';

// deps
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {

	// allow cors
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// routes
app = require('./mongo-crud.js')('items', app, express);

// start server
app.listen(3000);
