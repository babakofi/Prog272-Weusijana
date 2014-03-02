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
            }
        });
    };

    var searchForKeywords = function(event) {
        console.log("searchForKeywords called");
        if (sonnets) {
            var keywords = $("#keywordInputs").val().trim().split(/\b\s+/);
            if (keywords) {
                resetUI(); sonnetsKeywordsForLoop:
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
                                    // TODO: Move on so I don't append this sonnet again, without skipping other possibilities
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

    return App;
})();

$(document).ready(function() {
    var app = new App();
});
