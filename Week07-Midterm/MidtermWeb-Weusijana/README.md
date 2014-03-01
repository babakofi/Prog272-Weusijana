# Shakespeare's 154 Sonnets
This Web App has these features:

- Display a list of all poems to the user

When the Web App is loaded it displays HTML with a series of buttons on it. Users pick one of the buttons to read in a list of poems, select a poem, etc.

- Let the user pick a poem and display it
- Let the user search on keywords associated with the poems and display the results in the form of titles. When a title is selected display the poem.
- Store a new poem in the database. The poem can be stored as JSON on the drive
- Delete a poem from the database.
- Reads in a config listed in JSON

This project was started with [HTML5 Boilerplate](http://html5boilerplate.com)

# Instructions for developers:
Be sure you have installed Bower. On Linux:

	sudo npm install -g bower
	sudo npm install -g grunt-cli

Then run **npm install**.

## Unit Tests

The following describes how to run unit tests on on node applications 
	
## Install Jasmine-Node

	sudo npm install -g jasmine-node
	
You will also want to install request locally:

	npm install request
	
Or

	npm install request --save-dev
	
## Create Route

Create a simple route you want to test:

	app.get('/hello', function(request, response) { 'use strict';
		response.send('Hi there.');
	});
	
## Basic Jasmine-Noded

Now test it by saving the following as **Tests/SimpleSpec.js**:

	var request = require('request');

	describe("A suite", function() {
		it("should respond with hello world", function(done) {
			request("http://localhost:30025/hello", function(error, response, body) {
				expect(body).toEqual("Hi there.");
				done();
			});
		});
	}); 

## Run the test:

Now run start your server running in one shell:

	node server.js
	
Then open a second shell and run your tests:

	jasmine-node Tests/

