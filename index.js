
// config
process.env.MONGO_CONNECTION_URL = 'mongodb://localhost:27017/api';

// deps
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app = require('./mongo-crud.js')('items', app, express);

// start server
app.listen(3000);
