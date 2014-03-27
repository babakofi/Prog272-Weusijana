/**
 * Module dependencies.
 */

DEBUG = true;
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var walkDirs = require("./Source/WalkDirs").walkDirs;
var s3Code = require("./Source/S3Code");
var fs = require("fs");
var exec = require('child_process').exec;
var queryMongo = require('./Source/QueryMongo').QueryMongo;
var options = null;

var app = express();

// all environments
app.set('port', process.env.PORT || 30025);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Source')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.favicon('Images/favicon16.ico'));
// app.use(express.favicon(path.join(__dirname, 'favicon16.ico')));

var collectionName = 'MongoConfig';

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(request, response) {
	'use strict';
	var html = fs.readFileSync(__dirname + '/public/index.html');
	response.writeHeader(200, {
		"Content-Type" : "text/html"
	});
	response.write(html);
	response.end();
});

// app.get('/', routes.index);
// app.get('/users', user.list);

/*
 * You will need to edit one or more objects in Options.json. They have this
 * general format
 * 
 * var options = { pathToConfig: '/home/charlie/config.json', reallyWrite: true,
 * bucketName: 'bucket01.elvenware.com', folderToWalk: "Files", s3RootFolder:
 * "FilesTwo", createFolderToWalkOnS3: true, createIndex: true, filesToIgnore:
 * ['Thumbs.db', '.gitignore', 'MyFile.html'] };
 * 
 * Before filling it out, see the README file for this project.
 */

app.get('/getOptions', function(request, response) {
	'use strict';
	console.log("app.get('/getOptions'... called");
	try {
		if (options === null) {
			console.log("options === null, try reading from file system...");
			options = fs.readFileSync("Options.json", 'utf8');
			options = JSON.parse(options);
		}
		console.log("options:");
		console.log(options);
		response.send(options);
	} catch (e) {
		console.log(e);
		console.log("options === null, try reading from cloud db...");
		var query = {
			"id" : "1395883607551"
		};
		console.log("query is a:", typeof query);
		console.log("query:");
		console.log(query);
		// request.query = query;
		try {
			queryMongo.getCollectionData(response, query, collectionName);
		} catch (queryErr) {
			console.log(queryErr);
		}
	}
});

app.get('/listBuckets', function(request, response) {
	'use strict';
	console.log("ListBuckets called");
	console.log(request.query);
	var options = JSON.parse(request.query.options);
	console.log("ListBuckets: ", options.pathToConfig);
	s3Code.loadConfig(options.pathToConfig);
	s3Code.listBuckets(response, true);
});

app.get('/copyToS3', function(request, response) {
	'use strict';
	console.log(typeof request.query.options);
	var options = JSON.parse(request.query.options);
	console.log(options);
	walkDirs(options, response);
});

var buildAll = function(response, config, index) {
	'use strict';
	console.log("BuildAll was called");
	// var config = fs.readFileSync("MarkdownTransformConfig.json", 'utf8');
	// config = JSON.parse(config);
	var command = config[index].pathToPython + " MarkdownTransform.py -i "
			+ index;
	try {
		exec(command, function callback(error, stdout, stderr) {
			// Read in the HTML send the HTML to the client
			console.log("convertToHtml was called er: ", error);
			console.log("convertToHtml was called so: ", stdout);
			console.log("convertToHtml was called se: ", stderr);
			response.send({
				"result" : "Success",
				"data" : stdout
			});
		});
	} catch (e) {
		console.log(e.message);
		response.send({
			"result" : "error",
			"data" : e
		});
	}
};

app.get('/buildAll', function(request, response) {
	'use strict';
	console.log("buildAll called");
	var options = JSON.parse(request.query.options);
	buildAll(response, options, request.query.index);
});

app.get('/getBuildConfig', function(request, response) {
	'use strict';
	console.log('getBuildConfig called');
	var options = fs.readFileSync("MarkdownTransformConfig.json", 'utf8');
	options = JSON.parse(options);
	response.send(options);
});

// Mongo Config Methods
app.get('/deleteData', function(request, response) {
	'use strict';
	console.log('Remove called');
	queryMongo.removeAll(response, collectionName);
});

function readAndInsertConfig(response, filename) {
	'use strict';
	console.log("readAndInsertConfig called.");
	console.log("response:", response);
	if ((filename === null) || (filename === undefined)) {
		console.log("filename: WAS null/undefined");
		filename = 'config.json';
	}
	console.log("filename:", filename);
	fs.readFile(filename, 'utf8', function(err, fileContent) {
		if (err) {
			console.log(err);
			response.send({
				"Error" : err
			});
		} else {
			console.log(fileContent);
			fileContent = JSON.parse(fileContent);
			queryMongo.insertIntoCollection(response, collectionName,
					fileContent);
			// response.send({ "result" : fileContent });
		}
	});
}

app.post('/upsert', function(request, response) {
	'use strict';
	console.log("inside callback for app.post('/upsert', callback)");
	if (request.body) {
		console.log("request.body:");
		console.log(request.body);
		var configData = request.body;

		if (!(configData.id)) {
			// First time saving data to cloud database, set it's unique id
			configData.id = String((new Date()).getTime());
		}
		queryMongo.upsert(response, collectionName, configData);
	}
});

app.get('/insertConfig', function(request, response) {
	'use strict';
	readAndInsertConfig(response);
});

app.get('/read', function(request, response) {
	'use strict';
	console.log('read route called');
	console.log('request.query.collectionName: ', collectionName);
	var query = request.query.query;
	console.log(typeof query);
	console.log(query);
	queryMongo.getCollectionData(response, query, collectionName);
});

app.get('/runQuery', function(request, response) {
	'use strict';
	console.log('read route called');
	console.log('request.query.collectionName: ', collectionName);
	var query = request.query.query;
	console.log(typeof query);
	console.log(query);
	queryMongo.getCollectionData(response, query, collectionName);
});

app.get('/queryProject', function(request, response) {
	'use strict';
	console.log('queryProject route called: ', request.query);
	console.log('request.query.query: ', request.query.query);
	console.log('request.query.project: ', request.query.project);
	var query = request.query.query;
	console.log(typeof query);
	console.log(query);
	queryMongo.getCollectionProject(response, query, collectionName);
});

http.createServer(app).listen(app.get('port'), function() {
	'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});