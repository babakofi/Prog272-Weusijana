/**
 * @author Baba Kofi Weusijana
 */

var Calculate = (function() {

    /*
     * The point is that there is no reference to a publisher
     * in this module and yet it can receive messages from
     * it.
     */
    function Calculate() {'use strict';
        console.log("Subscriber Calculate constructor called.");
        $.subscribe('debug', debugHandler);
        $.subscribe('debugDetail', debugDetailHandler);
        $.subscribe('add', addHandler);
    }

    function debugHandler(event, customMessage) {
        console.log("Subscriber Calculate.debugHandler called.");
        console.log(event);
        $("#debugMessageDisplay").html(customMessage.message);
    }

    function debugDetailHandler(event, customMessage) {
        console.log("Subscriber Calculate.debugDetailHandler called.");
        console.log(event);
        $("#debugDetailMessageDisplay").html(customMessage);
    }

    function addHandler(event, op1, op2, callback) {
        console.log("Subscriber Calculate.addHandler called.");
        console.log(event);
        console.log(op1);
        console.log(op2);
        console.log(callback);
        callback(event, (op1 + op2));
    }

    return Calculate;

})();
