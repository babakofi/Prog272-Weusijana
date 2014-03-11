/**
 * @author Baba Kofi Weusijana
 */

// Publisher
var CalculateUi = (function() {'use strict';

    /*
     * The point is that there is no reference to subscribers
     * in this module and yet they can receive messages from
     * this publisher.
     */
    function CalculateUi() {
        console.log("Publisher CalculateUi constructor called.");
        $("#privateButton").click(privateMethod);
        $.publish('debug', {
            message : "Publisher CalculateUi constructor called"
        });
    }

    var privateMethod = function() {
        console.log("Publisher private method called.");
        $.publish('debugDetail', 'CalculateUi.privateMethod called by ' + String(this));
    };

    return CalculateUi;

})();

