/**
 * @author BabaKofi
 */
/* jshint strict: true */
var DEBUG = false;
if (DEBUG) {
    console.log("index.js started");
}

var milesConvert = function(miles) {'use strict';
    var feetPerMile = 5280;
    if (DEBUG) {
        console.log('milesConvert function called');
    }
    if ((!miles) || (isNaN(miles))) {
        if (DEBUG) {
            console.log('Bad miles input was given:', miles);
        }
        return false;
    } else if (DEBUG) {
        console.log('miles input:', miles);
    }
    return miles * feetPerMile;
};

if (DEBUG) {
    console.log('milesConvert:', milesConvert);
    var result = milesConvert(3);
    console.log('result = milesConvert(3):', result);
}
