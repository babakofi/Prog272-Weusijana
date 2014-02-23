/**
 * @author Charlie Calvert
 */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var collectionName = 'test_data';

var port = process.env.PORT || 30025;

var url01 = 'mongodb://127.0.0.1:27017/test';

var database;
// Open the test database that comes with MongoDb
MongoClient.connect(url01, function(err, db) {
    console.log('In MongoClient.connect Callback');
    if (err) {
        throw err;
    }
    database = db;
    console.log('database:', database);
});

var getCollection = function(response) {
    if (database) {
        var collection = database.collection(collectionName);
        // Count documents in the collection
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // Return the collection to the response as JSON
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // $("#mongoData").html(results);
            // database.close();
            /*
             var body = '<html><body><h2>Mongo Data: ' + results[0].firstName + '</h2></body></html>';
             response.setHeader('Content-Type', 'text/html');
             response.setHeader('Content-Length', Buffer.byteLength(body));
             response.end(body);
             */
            response.json(results);
        });
    }
};

// Read the collection
app.get('/addresses', function(request, response) {'use strict';
    console.log("inside callback for app.get('/addresses', callback)");
    getCollection(response);
});

app.get('/', function(req, res) {
    var html = fs.readFileSync(__dirname + '/Public/index.html');
    res.writeHeader(200, {
        "Content-Type" : "text/html"
    });
    res.write(html);
    res.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.listen(port);
console.log('Listening on port :' + port);
