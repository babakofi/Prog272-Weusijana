/**
 * @author Baba Kofi Weusijana
 */
var MongoAddresses = (function() {'use strict';

    var addresses = [];

    function MongoAddresses() {
        $("#readAll").click(readAll);
        $("#showData").click(showData);

        readAll();
    }

    var displayRecord = function(index) {
        $('#id').html(addresses[index].id);
        $('#firstName').html(addresses[index].firstName);
        $('#lastName').html(addresses[index].lastName);
        $('#address').html(addresses[index].address);
        $('#city').html(addresses[index].city);
        $('#state').html(addresses[index].state);
        $('#zip').html(addresses[index].zip);
    };

    var showData = function() {
        var index = $("#userIndex").val();
        displayRecord(index);
    };

    var readAll = function() {
        console.log("readAll called");
        $.getJSON('/addresses', function(data) {
            addresses = data;
            console.log(data[0]);
            displayRecord(0);
            $("#mongoData").empty();
            for (var i = 0; i < data.length; i++) {
                $("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
            }
        });
    };

    return MongoAddresses;
})();

$(document).ready(function() {
    var mongoAddresses = new MongoAddresses();
});
