/**
 * @author Baba Kofi Weusijana
 */

function InfoMan() {

	var that = this;
	// var feetInOneMile = 5280;

	var loadParagraphHandler = function(event) {
		var idString = $(this).attr("id");
		if (idString) {
			var numberString = idString.slice(-2);
			if (numberString) {
				that.loadParagraph(numberString);
			}
		}
	};

	this.loadParagraph = function(numberString) {
		$("#div" + numberString).load("Sources.html #paragraph" + numberString);
	};

	$("button").click(loadParagraphHandler);

	console.log("InfoMan created and inititalized");
}
