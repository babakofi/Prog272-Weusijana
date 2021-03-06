/**
 * @author Baba Kofi Weusijana
 */

describe("Test InfoMan", function() {
    var infoMan = new InfoMan();

    beforeEach(function(done) {
        setTimeout(function() {
            infoMan.loadParagraph('02', done);
            // done();
        }, 400);
    });

    // This spec will not start until the done function is called in the call to beforeEach above.
    // And this spec will not complete until its done is called.
    it("expects loadParagraph('02') to have loaded content into #div02", function(done) {
        console.log($('#div02').html());
        var result = $('#div02').html().length;
        console.log(result);
        expect(result).toBeGreaterThan(9);
        done();
    });

    it("expects jsonParagraph('03') to have loaded content into #div03", function() {
        var checkResult = function(data, textStatus, jqXHR) {
            console.log('data', data);
            console.log('textStatus', textStatus);
            console.log('jqXHR', jqXHR);
            expect(data.title).toBeDefined();
            expect(data.content).toBeDefined();
        };
        infoMan.jsonParagraph('03', checkResult);
    });

});
