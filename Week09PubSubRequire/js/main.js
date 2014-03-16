/**
 * @author Baba Kofi Weusijana
 */

var DEBUG = false;

require.config({
	paths : {
		"jquery" : "vendor/jquery-1.11.0.min",
		"jquery.mobile" : "vendor/jquery.mobile-1.4.2/jquery.mobile-1.4.2.min",
		"tinyPubSub" : "vendor/tinypubsub"
	}
});

require([ 'plugins', 'jquery', "jquery.mobile", "Calculate", "CalculateUi", ],
		function(Plugins, jQuery, jQuery_mobile, Calculate, CalculateUi) {
			/**
			 * Must call Plugins.Plugins(); first to avoid problems with
			 * browsers that don't support console
			 */
			Plugins.Plugins();
			if (DEBUG) {
				console.log("Main called.");
				console.log("Plugins", Plugins);
				console.log("jQuery", jQuery);
				console.log("jQuery_mobile", jQuery_mobile);
				console.log("Calculate", Calculate);
				console.log("CalculateUi", CalculateUi);
			}
			// Create Calculator
			var calc = new Calculate.Calculate();
			if (DEBUG)
				console.log("calc", calc);
			// Create CalculateUi Controller
			var calcUI = new CalculateUi.CalculateUi();
			if (DEBUG)
				console.log("calcUI", calcUI);
		});
