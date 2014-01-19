describe("Prog272 Jasmine Test Suite for MilesObject", function() {
    "use strict";
    it("expects 1 mile to be 5280 feet", function() {
        var actual = milesConvert.milesToFeet(1);
        expect(actual).toBe(5280);
    });
    it("expects -1 mile to be -5280 feet", function() {
        var actual = milesConvert.milesToFeet(-1);
        expect(actual).toBe(-5280);
    });
    it("expects 1.5 mile to be 7920 feet", function() {
        var actual = milesConvert.milesToFeet(1.5);
        expect(actual).toBe(7920);
    });
    it("expects 3 miles to be 15840 feet", function() {
        var actual = milesConvert.milesToFeet(3);
        expect(actual).toBe(15840);
    });
    it("expects 30 miles to be 158400 feet", function() {
        var actual = milesConvert.milesToFeet(30);
        expect(actual).toBe(158400);
    });
    it("expects no input to assume 3 miles to be 15840 feet", function() {
        var actual = milesConvert.milesToFeet();
        expect(actual).toBe(15840);
    });
    it("expects null input to assume 3 miles to be 15840 feet", function() {
        var actual = milesConvert.milesToFeet(null);
        expect(actual).toBe(15840);
    });
    it("expects undefined input to assume 3 miles to be 15840 feet", function() {
        var actual = milesConvert.milesToFeet(undefined);
        expect(actual).toBe(15840);
    });
    it("expects non number input to assume 3 miles to be 15840 feet", function() {
        var actual = milesConvert.milesToFeet("not a number");
        expect(actual).toBe(15840);
    });
}); 