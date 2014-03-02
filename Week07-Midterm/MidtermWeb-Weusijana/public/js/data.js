/**
 * @author Baba Kofi Weusijana
 */
var Data = (function() {'use strict';

    var data = null;

    function Data() {
    }

    Data.prototype.readAll = function(callback) {
        console.log("readAll called");
        $.getJSON('/poems', callback);
    };

    /* Upserts just the sonnets part of the collection */
    Data.prototype.updateSonnnets = function(sonnetsArray, callback) {
        console.log("updateSonnnets called");
        var data = {
            "sonnets" : sonnetsArray
        };
        // console.log("data:");
        // console.log(data);
        $.post('/updateSonnnets', data, callback, 'json');
    };

    return Data;
})();
