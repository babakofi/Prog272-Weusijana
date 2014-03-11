/**
 * @author Baba Kofi Weusijana
 */

var Calculate = (function() {

    /*
     * The point is that there is no reference to subscribers & publishers
     * in this module and yet they can communicate messages.
     */
    function Calculate() {'use strict';
        if (DEBUG)
            console.log("Subscriber Calculate constructor called.");
        $.subscribe('debug', debugHandler);
        $.subscribe('debugDetail', debugDetailHandler);
        $.subscribe('add', addHandler);
        $.subscribe('subtract', subtractHandler);
        $.subscribe('multiply', multiplyHandler);
        $.subscribe('divide', divideHandler);
    }

    function debugHandler(event, customMessage) {
        if (DEBUG) {
            console.log("Subscriber Calculate.debugHandler called.");
            console.log(event);
        }
        $("#debugMessageDisplay").html(customMessage.message);
    }

    function debugDetailHandler(event, customMessage) {
        if (DEBUG) {
            console.log("Subscriber Calculate.debugDetailHandler called.");
            console.log(event);
        }
        $("#debugDetailMessageDisplay").html(customMessage);
    }

    function addHandler(event, op1, op2, callbackTopic) {
        if (DEBUG) {
            console.log("Subscriber Calculate.addHandler called.");
            console.log(event);
            console.log(op1);
            console.log(op2);
            console.log(callbackTopic);
        }
        $.publish(callbackTopic, (op1 + op2));
    }

    function subtractHandler(event, op1, op2, callbackTopic) {
        if (DEBUG) {
            console.log("Subscriber Calculate.subtractHandler called.");
            console.log(event);
            console.log(op1);
            console.log(op2);
            console.log(callbackTopic);
        }
        $.publish(callbackTopic, (op1 - op2));
    }

    function multiplyHandler(event, op1, op2, callbackTopic) {
        if (DEBUG) {
            console.log("Subscriber Calculate.multiplyHandler called.");
            console.log(event);
            console.log(op1);
            console.log(op2);
            console.log(callbackTopic);
        }
        $.publish(callbackTopic, (op1 * op2));
    }

    function divideHandler(event, op1, op2, callbackTopic) {
        if (DEBUG) {
            console.log("Subscriber Calculate.divideHandler called.");
            console.log(event);
            console.log(op1);
            console.log(op2);
            console.log(callbackTopic);
        }
        $.publish(callbackTopic, (op1 / op2));
    }

    return Calculate;

})();
