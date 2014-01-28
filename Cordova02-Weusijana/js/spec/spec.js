describe("Prog272 Jasmine Test Suite for Converter", function() {"use strict";
    it("expects Converter to exist", function() {
        var converterExists = false;
        try {
            if (Converter) {
                converterExists = true;
            }
        } catch(error) {
            console.log("error while expecting Converter to exist:", error);
        } finally {
            expect(converterExists).toBe(true);
        }
    });
    it("expects 1 mile to be 0.621371 kilometers", function() {
        var actual = Converter.milesToKilometers(1);
        expect(actual).toBe(0.621371);
    });
    it("expects -1 mile to be -0.621371 kilometers", function() {
        var actual = Converter.milesToKilometers(-1);
        expect(actual).toBe(-0.621371);
    });
    it("expects 1.5 mile to be 2.414016 kilometers", function() {
        var actual = Converter.milesToKilometers(1.5);
        expect(actual).toBe(2.414016);
    });
    it("expects 3 miles to be 4.82803 kilometers", function() {
        var actual = Converter.milesToKilometers(3);
        expect(actual).toBe(4.82803);
    });
    it("expects 30 miles to be 4.828030 kilometers", function() {
        var actual = Converter.milesToKilometers(30);
        expect(actual).toBe(4.828030);
    });
    it("expects no input to be null output", function() {
        var actual = Converter.milesToKilometers();
        expect(actual).toBe(null);
    });
    it("expects null input to be null output", function() {
        var actual = Converter.milesToKilometers(null);
        expect(actual).toBe(null);
    });
    it("expects undefined input to be null output", function() {
        var actual = Converter.milesToKilometers(undefined);
        expect(actual).toBe(null);
    });
    it("expects non number input to be null output", function() {
        var actual = Converter.milesToKilometers("not a number");
        expect(actual).toBe(null);
    });
});
