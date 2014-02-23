/**
 * @author Charlie Calvert
 * @author Baba Kofi Weusijana
 */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var database = null;
var numberOfRecordsToInsert = 250;
var collectionName = 'test_data';

var QueryMongo = (function() {

    var url01 = 'mongodb://127.0.0.1:27017/test';
    var url02 = 'mongodb://192.168.2.19:27017/test';
    var url03 = 'mongodb://192.168.56.101:27017/test';

    function QueryMongo() {

    }


    QueryMongo.prototype.getData = function(result) {
        console.log('Called getData');
        // Open the test database that comes with MongoDb
        MongoClient.connect(url01, function(err, db) {
            console.log('In getDataCallback');
            if (err) {
                throw err;
            }
            database = db;
            console.log('database:', database);
            // insertIntoCollection(database, collectionName, { f : 7 });
            // getCollection(database, result);
        });

    };

    QueryMongo.prototype.connect = function(afterConnectCallbackFunction) {
        console.log('Called connect');
        // Open the test database that comes with MongoDb
        MongoClient.connect(url01, afterConnectCallbackFunction);
    };

    QueryMongo.prototype.getCollection = function(database, collection, response) {

        // Count documents in the collection
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // Return the collection to the response as JSON
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // $("#mongoData").html(results);
            database.close();
            /*
             var body = '<html><body><h2>Mongo Data: ' + results[0].firstName + '</h2></body></html>';
             response.setHeader('Content-Type', 'text/html');
             response.setHeader('Content-Length', Buffer.byteLength(body));
             response.end(body);
             */
            response.json(results);
        });

    };

    // Will create collection if it does not exist
    QueryMongo.prototype.insertIntoCollection = function(database, collectionName, objectToInsert) {

        var collection = database.collection(collectionName);
        collection.insert(objectToInsert, function(err, docs) {
            if (err) {
                throw err;
            }
            // database.close();
            console.log(objectToInsert.id, ": insert succeeded");
            /*
             collection.count(function(err, count) {
             if (err) {
             throw err;
             } else {
             console.log("collection.count:", count);
             if (count >= numberOfRecordsToInsert) {
             try {
             database.close();
             } catch(closeerr) {
             console.dir(closeerr);
             }
             }
             }
             });
             */
        });
    };

    return QueryMongo;

})();

// var closeWhenAllRecordsInserted = function(collection) {
// // Perform a total count command
// collection.count(function(err, count) {
// if (err) {
// throw err;
// } else {
// console.log("count:", count);
// if (count >= numberOfRecordsToInsert) {
// database.close();
// } else {
// closeWhenAllRecordsInserted(collection);
// }
// }
// });
// };

var queryMongo = new QueryMongo();
queryMongo.connect(function(err, db) {
    console.log("In queryMongo.connect's callback");
    if (err) {
        throw err;
    }
    database = db;
    // console.log('database:', database);

    // Erase the old collection if it exists
    var collection = database.collection(collectionName);
    collection.remove(function(err) {
        if (err) {
            throw err;
        }
        // Run a loop to generate the new data
        for (var recNum = 0; recNum < numberOfRecordsToInsert; recNum++) {
            var data = {
                "id" : recNum,
                "firstName" : "Rita10" + recNum,
                "lastName" : "Hill10" + recNum,
                "address" : "10" + recNum + " Ruby Street",
                "city" : "Bellevue",
                "state" : "WA",
                "zip" : "98002"
            };
            // console.log('data:', data);
            if (data) {
                queryMongo.insertIntoCollection(database, collectionName, data);
            }
        }
    });
});
