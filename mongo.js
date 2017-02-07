'use strict';

var client = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

var handleError = function(err) {
	if (err) {
		throw err;
	}
};

var easyConnect = function(callback) {
	//simplifies the connection opening, but you have to remember to close!

	client.connect(process.env.MONGO_CONNECTION_URL, function(err, db) {
		handleError(err);
		return callback(null, db);
	});
};

module.exports.oid = function(id) {
	//converts standard old hash into mongo's ObjectId type

	return new objectId(id);
};

module.exports.create = function(collectionName, properties, callback) {
	easyConnect(function(err, db) {
		db.collection(collectionName).insert(properties, function(err, result) {
			handleError(err);
			callback(err, result);
			db.close();
		});
	});
};

module.exports.find = function(collectionName, properties, callback) {
	easyConnect(function(err, db) {
		db.collection(collectionName).find(properties || {}).toArray(function(err, docs) {
			handleError(err);
			callback(err, docs);
			db.close();
		});
	});
};

module.exports.update = function(collectionName, filter, updatedProperties, callback) {
	easyConnect(function(err, db) {
		db.collection(collectionName).update(filter || {}, { $set: updatedProperties }, function(err, result) {
			handleError(err);
			callback(err, result);
			db.close();
		});
	});
};

module.exports.delete = function(collectionName, filter, callback) {
	easyConnect(function(err, db) {
		db.collection(collectionName).deleteMany(filter || {}, function(err, result) {
			handleError(err);
			callback(err, result);
			db.close();
		});
	});
};
