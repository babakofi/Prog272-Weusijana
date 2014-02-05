/**
 * @author Baba Kofi Weusijana
 */

function InfoMan() {

    var that = this;
    // var feetInOneMile = 5280;

    if (!window.console) {
        window.console = {
            log : function(input) {
                input = undefined;
            }
        };
    }

    var loadParagraphHandler = function(event) {
        var idString = $(this).attr("id");
        if (idString) {
            var numberString = idString.slice(-2);
            if (numberString) {
                that.loadParagraph(numberString);
            }
        }
    };

    this.loadParagraph = function(numberString, completionHandler) {
        $("#div" + numberString).load("Sources.html #paragraph" + numberString, completionHandler);
    };

    $("button").click(loadParagraphHandler);

    console.log("an InfoMan has been created and inititalized");
}
