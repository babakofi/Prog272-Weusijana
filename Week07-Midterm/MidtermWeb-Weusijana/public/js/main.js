/**
 * @author Baba Kofi Weusijana
 */
var App = (function() {'use strict';

    var sonnets = [];

    function App() {
        $("#readAll").click(readAll);
        $("#showData").click(showData);

        readAll();
    }

    var displayRecord = function(index) {
        $('#id').html(sonnets[index].id);
        $('#title').html(sonnets[index].title);
        $('#content').html(sonnets[index].content);
        $('#author').html(sonnets[index].author);
        $('#keywords').html(sonnets[index].keywords);
    };

    var showData = function() {
        var index = $("#userIndex").val();
        displayRecord(index);
    };

    var readAll = function() {
        console.log("readAll called");
        $.getJSON('/poems', function(data) {
            console.log(data[0]);
            sonnets = data[0].sonnets;
            displayRecord(0);
            $("#mongoData").empty();
            for (var i = 0; i < sonnets.length; i++) {
                $("#mongoData").append('<li>' + JSON.stringify(sonnets[i]) + '</li>');
            }
        });
    };

    return App;
})();

$(document).ready(function() {
    var app = new App();
});
