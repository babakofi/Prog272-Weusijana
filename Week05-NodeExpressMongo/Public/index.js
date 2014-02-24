/**
 * @author Baba Kofi Weusijana
 */
var MongoAddresses = (function() {'use strict';

    var addresses = [];

    function MongoAddresses() {
        $("#readAll").click(readAll);
        $("#showData").click(showData);
        $("#readRecords").click(readRecords);

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

    var insertNewRecord = function() {
        console.log("insert New Record called");
        $.getJSON('/newRecord', function(data) {
            alert(data);
        });
    };

    var readRecords = function() {
        console.log("readRecords called");
        var request = {};
        request.numRequested = $('#numToRead').val();
        $.getJSON('/readRecords', request, function(data) {
            addresses = data;
            console.log(data[0]);
            console.log(data[1]);
            displayRecord(0);
            $("#addresses").empty();
            for (var i = 0; i < data.length; i++) {
                $("#addresses").append('<li>' + JSON.stringify(data[i]) + '</li>');
            }
        });

    };

    return MongoAddresses;
})();

$(document).ready(function() {
    var mongoAddresses = new MongoAddresses();
});
