/**
 * @author Charlie Calvert
 */

var MongoClient = require('mongodb').MongoClient;

var QueryMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var url = null;
	
	function QueryMongo() {
		var urls = ['mongodb://127.0.0.1:27017/test',
			'mongodb://192.168.2.19:27017/test',
			'mongodb://192.168.2.34:27017/test',
			'mongodb://192.168.56.101:27017/test'];

		url = urls[0];
	}

	var getDatabase = function(getDatabaseCallbackFunction) {
		console.log('Called getDatabase');
		if (database !== null) {
			console.log('database exists');
			database.open(function(err, database) {
				if (err) {
					throw err;
				}
				getDatabaseCallbackFunction(database);
			});
		} else {
			console.log('Querying for database');
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					throw err;
				}
				database = databaseResult;
				getDatabaseCallbackFunction(database);
			});
		}
	};

	QueryMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection('test_insert');

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
	
	QueryMongo.prototype.getCollectionCount = function(initResponse, count) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection('test_insert');

			// Send the collection to the client.
			collection.find().limit(count).toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};

	QueryMongo.prototype.insertIntoCollection = function(objectToInsert) {
		console.log("insertIntoCollection called");
		var collection = database.collection("test_insert");
		collection.insert(objectToInsert, function(err, docs) {
			if (err) {
				throw err;
			}
			console.log("insert succeeded");
		});
	};

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
