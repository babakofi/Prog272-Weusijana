/**
 * @author BabaKofi.Weusijana
 */

var myObject = function() {

	function setParagraph(event) {
		event.preventDefault();
		$('#paragraph02').html('You clicked the button');
	};

	$("#button01").click(setParagraph);
	$("#paragraph01").html("This sentence added by jQuery");
};

$(document).ready(function() {
	myObject();
});
