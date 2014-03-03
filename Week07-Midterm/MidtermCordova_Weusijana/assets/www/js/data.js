/**
 * @author Baba Kofi Weusijana
 */
var Data = (function() {'use strict';

    var data = null;

    function Data() {
    }


    Data.prototype.readAll = function(callback) {
        console.log("readAll called");
        $.getJSON('http://192.168.1.5:30025/poems', callback).fail(function(failCallbacks) {
            console.log("$.getJSON('/poems', callback) ERROR!");
            console.log("failCallbacks:");
            $.each(failCallbacks, function(index, value) {
                console.log(index + ": " + value);
            });
        }).always(function() {
            console.log("$.getJSON('/poems', callback) complete");
        });
    };

    /* Upserts just the sonnets part of the collection */
    Data.prototype.updateSonnnets = function(sonnetsArray, callback) {
        console.log("updateSonnnets called");
        var data = {
            "sonnets" : sonnetsArray
        };
        // console.log("data:");
        // console.log(data);
        $.post('http://192.168.1.5:30025/updateSonnnets', data, callback, 'json');
    };

    return Data;
})();
