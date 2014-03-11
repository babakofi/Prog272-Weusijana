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
    }

    function debugHandler(event, customMessage) {
        console.log("Subscriber Calculate.debugHandler called.");
        console.log(event);
        $("#message01").html(customMessage.message);
    }

    function debugDetailHandler(event, customMessage) {
        console.log("Subscriber Calculate.debugDetailHandler called.");
        console.log(event);
        $("#message02").html(customMessage);
    }

    return Calculate;

})();
