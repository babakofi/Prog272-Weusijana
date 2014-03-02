describe("Client Side Suite", function() {

    var datacontroller = null;

    beforeEach(function() {
        datacontroller = new Data();
    });

    it("Proves Jasmine is working", function() {
        expect(true).toBe(true);
    });

    it("Proves we can create client data controller", function() {
        expect(datacontroller).not.toBeNull();
    });

    it("Performs Async intergration test on readAll", function(done) {
        console.log("datacontroller:", datacontroller);
        datacontroller.readAll(function(jsondata) {
            expect(jsondata[0].sonnets[1].title).toBe("Sonnet 2");
            done();
        });
    });

    it("Performs a mock test - a spy - on getJSON ", function() {
        spyOn($, "getJSON");
        datacontroller.readAll(null);
        expect($.getJSON).toHaveBeenCalled();
    });

    it("Performs a mock test - a spy - on getJSON parameters", function() {
        spyOn($, "post");
        datacontroller.updateSonnnets(null, null);
        expect($.post).toHaveBeenCalledWith('/updateSonnnets', {
            sonnets : null
        }, null, 'json');
    });

});
