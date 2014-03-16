/**
 * @author Baba Kofi Weusijana
 */

// Publisher
define([ 'jquery', 'tinyPubSub' ], function() {
	'use strict';
	/**
	 * The point is that there is no reference to subscribers & publishers in
	 * this module and yet they can communicate messages.
	 * 
	 * @exports CalculateUi
	 */

	var UPDATEUI_TOPIC = "updateUI";

	var CalculateUi = function() {
		if (DEBUG)
			console.log("Publisher CalculateUi constructor called.");
		if (DEBUG) {
			$("#debugMessageDisplay").show();
			$("#debugDetailMessageDisplay").show();
		}
		$("#add").click(opButtonClickHandler);
		$("#subtract").click(opButtonClickHandler);
		$("#multiply").click(opButtonClickHandler);
		$("#divide").click(opButtonClickHandler);
		$.subscribe(UPDATEUI_TOPIC, updateUI);
		$.publish('debug', {
			message : "Publisher CalculateUi constructor called"
		});
	};

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

	var opButtonClickHandler = function(event) {
		var operationTopic = $(this).attr("id");
		if (DEBUG)
			console.log("Publisher opButtonClickHandler method called by:",
					operationTopic);
		$.publish('debugDetail', 'CalculateUi.opButtonClickHandler called by '
				+ String(this));
		// First gather the user input.
		$("#flash").empty();
		var op1 = $("#operand1").val();
		if (DEBUG)
			console.log("op1:", op1);
		op1 = validateAndParseInput(op1);
		if (op1 === undefined) {
			$("#flash").html("Your first operand is not a number.");
			return;
		}
		var op2 = $("#operand2").val();
		if (DEBUG)
			console.log("op2:", op2);
		op2 = validateAndParseInput(op2);
		if (op2 === undefined) {
			$("#flash").html("Your second operand is not a number.");
			return;
		}
		// It should then publish a request for an object that can add the two
		// numbers.
		// It should pass both numbers in the request.
		// It should also provide a means for any subscriber to send back an
		// answer
		// (by reversing roles and publishing the answer).
		$.publish(operationTopic, [ op1, op2, UPDATEUI_TOPIC ]);
	};

	var updateUI = function(event, answer) {
		if (DEBUG)
			console.log("updateUI called with event:", event);
		if (DEBUG)
			console.log("answer:", answer);
		if (answer != undefined && answer != null) {
			if (!isNaN(answer) || answer == Infinity) {
				$("#answer").hide().val(answer).show();
			}
		}
	};

	return {
		CalculateUi : CalculateUi
	};

});
