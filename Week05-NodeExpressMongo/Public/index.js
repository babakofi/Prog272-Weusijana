/**
 * @author Baba Kofi Weusijana
 */
var addresses = [];



$(document).ready(function() {

	$.getJSON('/addresses', function(data) {
		console.log(data);
		addresses = data;
		for (var i = 0; i < data.length; i++) {
			$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
		}
	});
});
