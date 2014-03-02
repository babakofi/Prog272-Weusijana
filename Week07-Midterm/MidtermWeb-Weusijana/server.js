/**
 * @author Baba Kofi Weusijana
 */

var config = require('./config.json');
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var collectionName = 'Poems';
var port = process.env.PORT || 30025;
var dbpassword = config.dbpassword;
// var dbURL = 'mongodb://prog272:'+dbpassword+'@127.0.0.1:27017/prog272';
var dbURL = 'mongodb://prog272:' + dbpassword + '@ds033639.mongolab.com:33639/prog272';
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
            console.log("typeof results:", typeof results);
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

// Update the collection's sonnets
app.post('/updateSonnnets', function(request, response) {'use strict';
    console.log("inside callback for app.post('/updateSonnnets', callback)");
    //console.log("request.body:");
    //console.log(request.body);
    console.log("request.body.sonnets:");
    console.log(request.body.sonnets);

    if (database) {
        var collection = database.collection(collectionName);
        // Update the document using an upsert operation, ensuring creation if it does not exist
        collection.update({
            "id" : 0
        }, {
            "id" : 0,
            "sonnets" : request.body.sonnets
        }, {
            upsert : true,
            w : 1
        }, function(err, result) {
            if (err) {
                console.log("err:", err);
            }
            if ((result) && (result == 1)) {
                // Return the collection to the response as JSON
                collection.find().toArray(function(err, results) {
                    console.log("typeof results:", typeof results);
                    console.dir(results);
                    response.json(results);
                });
            } else {
                console.log("result:", result);
            }
        });
    }
});

// Default.
app.get('/', function(request, result) {'use strict';
    var html = fs.readFileSync(__dirname + '/public/index.html');
    result.writeHeader(200, {
        "Content-Type" : "text/html"
    });
    result.write(html);
    result.end();
});

app.use("/", express.static(__dirname + '/public'));
app.use("/", express.static(__dirname + '/js'));

app.listen(port);
console.log('Listening on port :' + port);
