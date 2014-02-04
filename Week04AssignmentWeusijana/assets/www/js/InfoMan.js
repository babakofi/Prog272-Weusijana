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
    
    this.feetToMiles = function(miles) {
        return miles * feetInOneMile;
    };
    
    $("#milesButton").click(feetToMilesPrivate);
    
}
