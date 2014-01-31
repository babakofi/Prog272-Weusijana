/**
 * @author BabaKofi.Weusijana
 */
function MyApp() {
	this.getData = function() {
		$.getJSON('index.json', function(data) {
			var result = "<p>Result:" + data.result + "</p>";
			var value = "<p>Value:" + data.value + "</p>";
			$("#resultDiv").html(result + value);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};
	
	this.getHtml = function(){
		$("#resultDiv02").load("MyFile.html #paragraph01", function() {
			console.log("MyFile.html loaded");
		});
	};
};

$(document).ready(function() {
	var myApp = new MyApp();
	myApp.getData();
	myApp.getHtml();
});
