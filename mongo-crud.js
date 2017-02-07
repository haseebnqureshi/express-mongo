'use strict';

var mongo = require('./mongo.js');

module.exports = function(collectionName, app, express) {

	var router = express.Router();

	router.route('/')
		.post(function(req, res, next) {
			mongo.create(collectionName, req.body, function(err, data) {
				var status = err ? 500 : 200;
				res.status(status).send({ status, err, data });
			});
		})
		.get(function(req, res, next) {
			mongo.find(collectionName, {}, function(err, data) {
				var status = err ? 500 : 200;
				if (data.length === 0) { status = 404; }
				res.status(status).send({ status, err, data });
			});
		});

	router.route('/:id')
		.get(function(req, res, next) {
			var _id = mongo.oid(req.params.id);
			mongo.find(collectionName, { _id }, function(err, data) {
				var status = err ? 500 : 200;
				if (data.length === 0) { status = 404; }
				res.status(status).send({ status, err, data, params: req.params });
			});
		})
		.put(function(req, res, next) {
			var _id = mongo.oid(req.params.id);
			mongo.update(collectionName, { _id }, req.body, function(err, data) {
				var status = err ? 500 : 200;
				res.status(status).send({ status, err, data, params: req.params, body: req.body });
			});
		})
		.delete(function(req, res, next) {
			var _id = mongo.oid(req.params.id);
			mongo.delete(collectionName, { _id }, function(err, data) {
				var status = err ? 500 : 200;
				res.status(status).send({ status, err, data, params: req.params });
			});
		});

	app.use('/' + collectionName, router);

	return app;

};
