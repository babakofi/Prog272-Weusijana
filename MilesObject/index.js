/**
 * @author BabaKofi
 */
/* jshint strict: true */
var DEBUG = false;
if (DEBUG) {
    console.log("index.js started");
}
var milesConvert = {
    miles : 3,
    feetPerMile : 5280,
    milesToFeet : function(miles) {'use strict';
        if (DEBUG) {
            console.log('milesToFeet function called');
        }
        if ((!miles) || (isNaN(miles))) {
            miles = this.miles;
            if (DEBUG) {
                console.log('Bad input was given, setting miles input to:', miles);
            }
        } else if (DEBUG) {
            console.log('miles input:', miles);
        }
        return miles * this.feetPerMile;
    }
};

if (DEBUG) {
    console.log('milesConvert.miles:', milesConvert.miles);
    var result = milesConvert.milesToFeet(milesConvert.miles);
    console.log('result:', result);
}
