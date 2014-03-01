/**
 * @author Baba Kofi Weusijana
 */
var App = (function() {'use strict';

    var sonnets = [];

    function App() {
        $("#readAll").click(readAll);
        $("#showData").click(showData);
        $("#search").click(searchForKeywords);

        readAll();
    }

    var displayRecord = function(index) {
        $('#id').html(sonnets[index].id);
        $('#title').html(sonnets[index].title);
        $('#content').html(sonnets[index].content);
        $('#author').html(sonnets[index].author);
        var keywords = sonnets[index].keywords;
        if (keywords) {
            $('#keywords').html("<strong>Keywords:</strong>");
            for (var i = 0; i < keywords.length; i++) {
                $('#keywords').append("<span>" + keywords[i] + "</span>&nbsp;");
            }
        }
    };

    var showData = function() {
        var index = $("#userIndex").val();
        if (index) {
            if ((!isNaN(index)) && (index > -1)) {
                index--;
                displayRecord(index);
                return;
            }
        }
        // Something must have gone wrong, reset the userIndex
        $("#userIndex").val(1);
    };

    var showTitle = function(event) {
        console.log("event:", event);
        console.log("this:", this);
        console.log("this.value:", this.value);
        $("#userIndex").val(parseInt(this.value) + 1);
        showData();
    };

    var readAll = function() {
        console.log("readAll called");
        $.getJSON('/poems', function(data) {
            console.log(data[0]);
            sonnets = data[0].sonnets;
            if (sonnets) {
                resetUI();
                displayRecord(0);
                $("#mongoData").empty();
                for (var i = 0; i < sonnets.length; i++) {
                    var title = sonnets[i].title;
                    if (title) {
                        $("#titles").append('<button class="title" value="' + i + '" type="button">' + title + '</button>');
                    }
                    $("#mongoData").append('<li>' + JSON.stringify(sonnets[i]) + '</li>');
                }
                $(".title").click(showTitle);
            }
        });
    };

    var searchForKeywords = function(event) {
        console.log("searchForKeywords called");
        $.getJSON('/poems', function(data) {
            console.log(data[0]);
            sonnets = data[0].sonnets;
            if (sonnets) {
                resetUI();
                displayRecord(0);
                $("#mongoData").empty();
                for (var i = 0; i < sonnets.length; i++) {
                    var title = sonnets[i].title;
                    if (title) {
                        $("#titles").append('<button class="title" value="' + i + '" type="button">' + title + '</button>');
                    }
                    $("#mongoData").append('<li>' + JSON.stringify(sonnets[i]) + '</li>');
                }
                $(".title").click(showTitle);
            }
        });
    };

    var resetUI = function() {
        $("#keywordInputs").val("Enter Keywords");
        $("#titles").empty();
        $("#userIndex").val(1);
    };
    
    return App;
})();

$(document).ready(function() {
    var app = new App();
});
