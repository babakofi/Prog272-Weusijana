/**
 * @author Baba Kofi Weusijana
 */

var config = require('./config.json');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var collectionName = 'Poems';
var port = process.env.PORT || 30025;
var dbpassword = config.dbpassword;
// var dbURL = 'mongodb://prog272:'+dbpassword+'@127.0.0.1:27017/prog272';
var dbURL = 'mongodb://prog272:'+dbpassword+'@ds033639.mongolab.com:33639/prog272';
var database;

// Open the test database that comes with MongoDb
MongoClient.connect(dbURL, function(err, db) {
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
            console.log("typeof results:",typeof results);
            console.dir(results);
            response.json(results);
        });
    }
};

// Read the collection
app.get('/poems', function(request, response) {'use strict';
    console.log("inside callback for app.get('/poems', callback)");
    getCollection(response);
});


// Default.
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});

app.use("/", express.static(__dirname + '/public'));
app.use("/", express.static(__dirname + '/js'));

app.listen(port);
console.log('Listening on port :' + port);
