/**
 * @author BabaKofi
 */
/* jshint strict: true */

console.log("index.js started");

var milesConvert = {
	miles : 3,
	feetPerMile : 5280,
	milesToFeet : function(miles) {
		'use strict';
		console.log('milesToFeet function called');
		if (!miles) {
			miles = this.miles;
		}
		return miles * this.feetPerMile;
	}
};

console.log('milesConvert.miles:', milesConvert.miles);
var result = milesConvert.milesToFeet(milesConvert.miles);
console.log('result:', result);
