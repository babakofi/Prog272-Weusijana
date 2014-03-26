/**
 * @author Charlie Calvert
 * @author Baba Kofi Weusijana
 */

require.config({
	paths : {
		"jquery" : "jquery-2.1.0",
		"jqm" : "jquery.mobile-1.4.2/jquery.mobile-1.4.2",
		"awsui" : "AwsUi"
	}
});

require([ "jquery", "jqm", "awsui" ], function($, jqm, awsui) {
	'use strict';
	console.log("Main called.");
	console.log("$:");
	console.log($);
	$();
	console.log("jqm:");
	console.log(jqm);
	console.log("awsui:");
	console.log(awsui);
	awsui();
});
