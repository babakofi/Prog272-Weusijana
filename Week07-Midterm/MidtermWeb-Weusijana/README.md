# Shakespeare Sonnets
This Web App has these features:

- Display a list of all poems to the user

When the Web App is loaded it displays HTML with a series of buttons on it. Users pick one of the buttons to read in a list of poems, select a poem, etc.

- Lets the user pick a poem and display it
- Lets the user search on keywords associated with the poems and display the results in the form of titles. When a title is selected the poem is displayed.
- Stores a new poem in the database.
- Deletes a poem from the database.
- Reads in a config.json file on the server side

This project was started with [HTML5 Boilerplate](http://html5boilerplate.com)

# Server side testing instructions for developers:
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
	
## Run the tests in serverSpec.js:

Now run start your server running in one shell:

	node server.js
	
Then open a second shell and run your tests:

	./RunTests.sh

That should also generate test reports to the .reports directory in JUinit XML format. If you don't want to generate reports, just run:

	jasmine-node Tests/serverSpec.js

