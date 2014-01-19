describe("Prog272 Jasmine Test Suite for MilesFunction", function() {
    "use strict";
    it("expects 1 mile to be 5280 feet", function() {
        var actual = milesConvert(1);
        expect(actual).toBe(5280);
    });
    it("expects -1 mile to be -5280 feet", function() {
        var actual = milesConvert(-1);
        expect(actual).toBe(-5280);
    });
    it("expects 1.5 mile to be 7920 feet", function() {
        var actual = milesConvert(1.5);
        expect(actual).toBe(7920);
    });
    it("expects 3 miles to be 15840 feet", function() {
        var actual = milesConvert(3);
        expect(actual).toBe(15840);
    });
    it("expects 30 miles to be 158400 feet", function() {
        var actual = milesConvert(30);
        expect(actual).toBe(158400);
    });
    it("expects no input to be false", function() {
        var actual = milesConvert();
        expect(actual).toBe(false);
    });
    it("expects null input to be false", function() {
        var actual = milesConvert(null);
        expect(actual).toBe(false);
    });
    it("expects undefined input to be false", function() {
        var actual = milesConvert(undefined);
        expect(actual).toBe(false);
    });
    it("expects non number input to be false", function() {
        var actual = milesConvert("not a number");
        expect(actual).toBe(false);
        actual = milesConvert(milesConvert);
        expect(actual).toBe(false);
    });
}); 