/**
 * @author Baba Kofi Weusijana
 */
var App = (function() {'use strict';

    var sonnets = [];
    var DEFAULT_KEYWORD_INPUTS_TEXT_VALUE = 'Enter Keywords';

    function App() {
        $("#readAll").click(readAll);
        $("#showData").click(showData);
        $("#search").click(searchForKeywords);
        $('#keywordInputs').keydown(function(event) {
            if (event.keyCode == 13) {
                $('#search').trigger('click');
            }
        });
        $("#keywordInputs").focus(function(event) {
            if (this.value == DEFAULT_KEYWORD_INPUTS_TEXT_VALUE) {
                this.value = '';
            }
        });
        $("#deleteItem").click(deleteItem);

        readAll();
    }

    /* Escapes regular expressions like Ruby's RegExp.escape
     * See: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
     */
    var escapeRegExp = function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var replaceAll = function(find, replace, str) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    };

    var displayRecord = function(index) {
        // Assume zero-based index
        if ((!isNaN(index)) && (index > -1) && (index < sonnets.length)) {
            //$('#id').html(sonnets[index].id);
            $('#title').html(sonnets[index].title);
            $('#content').html(replaceAll("\n", "<br/>", sonnets[index].content));
            $('#author').html(sonnets[index].author);
            var keywords = sonnets[index].keywords;
            if (keywords) {
                $('#keywords').html("<strong>Keywords:</strong>");
                for (var i = 0; i < keywords.length; i++) {
                    $('#keywords').append("<span class='keyword'>" + keywords[i] + "</span>&nbsp;");
                }
            }
            $('#userIndex').val(index + 1);
        } else {
            console.log("displayRecord:Problem with index:", index);
            console.log("isNaN(index):", isNaN(index));
            console.log("(index > -1):", (index > -1));
            console.log("(index < sonnets.length):", (index < sonnets.length));
            console.log("sonnets.length:", sonnets.length);
        }
    };

    var showData = function() {
        var index = $("#userIndex").val();
        if (index) {
            if ((!isNaN(index)) && (index > -1)) {
                index--;
                // Convert to zero-based index
                displayRecord(index);
                return;
            } else {
                console.log("showData:Problem with index:", index);
            }
        } else {
            console.log("showData:Problem with index:", index);
        }
        // Something must have gone wrong, reset the userIndex
        $("#userIndex").val(1);
    };

    var showTitle = function(event) {
        // console.log("event:", event);
        // console.log("this:", this);
        console.log("this.value:", this.value);
        var newUserIndex = parseInt(this.value) + 1;
        $("#userIndex").val(newUserIndex);
        showData();
    };

    var updateUI = function() {
        resetUI();
        $("#keywordInputs").val(DEFAULT_KEYWORD_INPUTS_TEXT_VALUE);
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
    };

    var readAll = function() {
        console.log("readAll called");
        $.getJSON('/poems', function(data) {
            console.log(data[0]);
            sonnets = data[0].sonnets;
            if (sonnets) {
                updateUI();
            }
        });
    };

    var searchForKeywords = function(event) {
        console.log("searchForKeywords called");
        if (sonnets) {
            var keywords = $("#keywordInputs").val().trim().split(/\b\s+/);
            if (keywords) {
                resetUI();
                sonnetsKeywordsForLoop:
                for (var i = 0; i < sonnets.length; i++) {
                    var sonnetsKeywords = sonnets[i].keywords;
                    if (sonnetsKeywords) { searchKeywordsForLoop:
                        for (var keywordIndex = 0; keywordIndex < keywords.length; keywordIndex++) {
                            var keyword = keywords[keywordIndex].toLowerCase();
                            if (keyword) {
                                var sonnetsKeywordIndex = sonnetsKeywords.indexOf(keyword);
                                if (sonnetsKeywordIndex > -1) {
                                    // Found a match
                                    var title = sonnets[i].title;
                                    if (title) {
                                        $("#titles").append('<button class="title" value="' + i + '" type="button">' + title + '</button>');
                                        $(".title").click(showTitle);
                                    }
                                    $("#mongoData").append('<li>' + JSON.stringify(sonnets[i]) + '</li>');
                                    // Move on so I don't append this sonnet again, without skipping other possibilities
                                    continue sonnetsKeywordsForLoop;
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    var resetUI = function() {
        $("#titles").empty();
        $("#userIndex").val(1);
        $("#mongoData").empty();
    };

    // TODO: Upsert just the sonnets part of the collection
    var updateSonnnets = function() {
        console.log("updateSonnnets called");
        var data = {
            "sonnets" : sonnets
        };
        console.log("data:");
        console.log(data);
        $.post('/updateSonnnets', data, function(response, status, xhr) {
            // Do something with the request
            console.log("updateSonnnets response:");
            console.log(response);
            console.log("updateSonnnets status:");
            console.log(status);
            console.log("updateSonnnets xhr:");
            console.log(xhr);
        }, 'json');
    };

    var deleteItem = function() {
        if (confirm("Are you sure you want to delete an item from the database?")) {
            // Get 1-based index
            var index = $("#userIndex").val();
            if (index) {
                if ((!isNaN(index)) && (index > 0)) {
                    index--;
                    // Converting to zero-based index
                    if (index < sonnets.length) {
                        // remove indexed item from sonnets Array
                        sonnets.splice(index, 1);
                        // Persist data change in database
                        updateSonnnets();
                        updateUI();
                        if (index >= sonnets.length) {
                            index = sonnets.length - 1;
                        }
                    }
                    displayRecord(index);
                    return;
                }
            }
            // Something must have gone wrong, reset the userIndex
            $("#userIndex").val(1);
        }
    };

    return App;
})();

$(document).ready(function() {
    var app = new App();
});
