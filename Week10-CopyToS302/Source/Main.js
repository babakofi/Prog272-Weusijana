/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-2.1.0.min",
    "awsui": "AwsUi"     
  }
});

require(["awsui"], function(awsui) { 'use strict';
	console.log("Main called.");
	awsui();
});
