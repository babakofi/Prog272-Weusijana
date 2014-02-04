/**
 * @author Baba Kofi Weusijana
 */

function InfoMan() {

    var that = this;
    var feetInOneMile = 5280;

    var feetToMilesPrivate = function() {
        var miles = $("#dataInput").val();
        var result = that.feetToMiles(miles);
        $("#dataInput").val(result);
    };

    this.loadParagraph = function(event) {
        var idString = $(this).attr("id");
        if (idString) {
            var numberString = idString.slice(-2);
            if (numberString) {
                $("#div" + numberString).load("Sources.html #paragraph" + numberString);
            }
        }
    };

    $("button").click(this.loadParagraph);

    console.log("InfoMan created and inititalized");
}
