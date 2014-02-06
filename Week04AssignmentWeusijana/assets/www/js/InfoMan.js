/**
 * @author Baba Kofi Weusijana
 */

function InfoMan() {

    if (!window.console) {
        window.console = {
            log : function(input) {
                input = undefined;
            }
        };
    }

    var that = this, jsonParagraphHandler = function(data, textStatus, jqXHR) {
        if (data) {
            var title = data.title, content = data.content;
            console.log("title:", title);
            console.log("content:", content);
            if (this.url) {
                var numberString = this.url.slice(-7, -5);
                if (numberString) {
                    console.log("numberString:", numberString);
                    var $div = $("#div" + numberString);
                    if ($div) {
                        $div.html("<p>" + title + "<br/>" + content + "</p>");
                    }
                }
            }
        }
    }, loadParagraphHandler = function(event) {
        var idString = $(this).attr("id");
        if (idString) {
            var numberString = idString.slice(-2);
            if (numberString) {
                if (idString.indexOf("Json") >= 0) {
                    that.jsonParagraph(numberString, jsonParagraphHandler);
                } else {
                    that.loadParagraph(numberString);
                }
            }
        }
    };

    this.loadParagraph = function(numberString, completionHandler) {
        $("#div" + numberString).load("Sources.html #paragraph" + numberString, completionHandler);
    };

    this.jsonParagraph = function(numberString, completionHandler) {
        $.getJSON("paragraph" + numberString + ".json", completionHandler);
    };

    $("button").click(loadParagraphHandler);

    console.log("an InfoMan has been created and inititalized");
}
