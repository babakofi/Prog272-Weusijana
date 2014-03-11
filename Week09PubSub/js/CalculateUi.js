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
        if (DEBUG) {
            $("#debugMessageDisplay").show();
            $("#debugDetailMessageDisplay").show();
        }
        $("#addButton").click(addButtonClickHandler);
        $.publish('debug', {
            message : "Publisher CalculateUi constructor called"
        });
    }

    var validateAndParseInput = function(input) {
        if (input != undefined && input != null && input != "") {
            input = parseFloat(input);
            if (isNaN(input)) {
                return undefined;
            }
            return input;
        }
        return undefined;
    };

    var addButtonClickHandler = function(event) {
        console.log("Publisher addButtonClickHandler method called.");
        $.publish('debugDetail', 'CalculateUi.addButtonClickHandler called by ' + String(this));
        // First gather the user input.
        $("#flash").empty();
        var op1 = $("#operand1").val();
        console.log("op1:", op1);
        op1 = validateAndParseInput(op1);
        if (op1 === undefined) {
            $("#flash").html("Your first operand is not a number.");
            return;
        }
        var op2 = $("#operand2").val();
        console.log("op2:", op2);
        op2 = validateAndParseInput(op2);
        if (op2 === undefined) {
            $("#flash").html("Your second operand is not a number.");
            return;
        }
        // It should then publish a request for an object that can add the two numbers.
        // It should pass both numbers in the request.
        // It should also provide a means for any subscriber to send back an answer.
        var callback = function(event, answer) {
            console.log("add's callback called with event:", event);
            console.log("answer:", answer);
            if (answer != undefined && answer != null) {
                if (!isNaN(answer)) {
                    $("#answer").hide().val(answer).show();
                }
            }
        };
        $.publish('add', [op1, op2, callback]);
    };

    return CalculateUi;

})();

