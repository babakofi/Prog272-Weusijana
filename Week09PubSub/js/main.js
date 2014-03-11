/**
 * @author Baba Kofi Weusijana
 */
var App = (function() {'use strict';

    var App = function() {
    }

    return App;
})();

$(document).ready(function() {
    // Create subscriber Calculate
    var calc = new Calculate();
    // Create publisher CalculateUi
    var calcUI = new CalculateUi();

    var app = new App();
});
