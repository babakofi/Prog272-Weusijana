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
    it("expects Converter.milesToKilometers to exist and be a function", function() {
        var exist = false;
        try {
            if (Converter.milesToKilometers) {
                exist = true;
                expect( typeof (Converter.milesToKilometers)).toBe('function');
            }
        } catch(error) {
            console.log("error while expecting Converter.milesToKilometers to exist:", error);
        } finally {
            expect(exist).toBe(true);
        }
    });
    it("expects 1 mile to be 1.60934 kilometers", function() {
        var actual = Converter.milesToKilometers(1);
        expect(actual).toBeCloseTo(1.60934);
    });
    it("expects -1 mile to be -1.60934 kilometers", function() {
        var actual = Converter.milesToKilometers(-1);
        expect(actual).toBeCloseTo(-1.60934);
    });
    it("expects 1.5 mile to be 2.41402 kilometers", function() {
        var actual = Converter.milesToKilometers(1.5);
        expect(actual).toBeCloseTo(2.41402);
    });
    it("expects 0.621371 miles to be 1 kilometers", function() {
        var actual = Converter.milesToKilometers(0.621371);
        expect(actual).toBeCloseTo(1);
    });
    it("expects 30 miles to be 48.2803 kilometers", function() {
        var actual = Converter.milesToKilometers(30);
        expect(actual).toBeCloseTo(48.2803);
    });
    it("expects no input to be undefined output", function() {
        var actual = Converter.milesToKilometers();
        expect(actual).toBe(undefined);
    });
    it("expects null input to be undefined output", function() {
        var actual = Converter.milesToKilometers(null);
        expect(actual).toBe(undefined);
    });
    it("expects undefined input to be undefined output", function() {
        var actual = Converter.milesToKilometers(undefined);
        expect(actual).toBe(undefined);
    });
    it("expects non number input to be undefined output", function() {
        var actual = Converter.milesToKilometers("not a number");
        expect(actual).toBe(undefined);
    });

    it("expects Converter.fahrenheitToCelsius to exist and be a function", function() {
        var exist = false;
        try {
            if (Converter.fahrenheitToCelsius) {
                exist = true;
                expect( typeof (Converter.fahrenheitToCelsius)).toBe('function');
            }
        } catch(error) {
            console.log("error while expecting Converter.fahrenheitToCelsius to exist:", error);
        } finally {
            expect(exist).toBe(true);
        }
    });
    it("expects 32 f to be 0.0 c", function() {
        var actual = Converter.fahrenheitToCelsius(32);
        expect(actual).toBeCloseTo(0.0);
    });
    it("expects -1 f to be -18.3333 c", function() {
        var actual = Converter.fahrenheitToCelsius(-1);
        expect(actual).toBeCloseTo(-18.3333);
    });
    it("expects 1.5 f to be -16.9444 c", function() {
        var actual = Converter.fahrenheitToCelsius(1.5);
        expect(actual).toBeCloseTo(-16.9444);
    });
    it("expects 3 f to be -16.1111 c", function() {
        var actual = Converter.fahrenheitToCelsius(3);
        expect(actual).toBeCloseTo(-16.1111);
    });
    it("expects 212 f to be 100 c", function() {
        var actual = Converter.fahrenheitToCelsius(212);
        expect(actual).toBeCloseTo(100);
    });
    it("expects no input to be undefined output", function() {
        var actual = Converter.fahrenheitToCelsius();
        expect(actual).toBe(undefined);
    });
    it("expects null input to be undefined output", function() {
        var actual = Converter.fahrenheitToCelsius(null);
        expect(actual).toBe(undefined);
    });
    it("expects undefined input to be undefined output", function() {
        var actual = Converter.fahrenheitToCelsius(undefined);
        expect(actual).toBe(undefined);
    });
    it("expects non number input to be undefined output", function() {
        var actual = Converter.fahrenheitToCelsius("not a number");
        expect(actual).toBe(undefined);
    });

    it("expects Converter.sqrt to exist and be a function", function() {
        var exist = false;
        try {
            if (Converter.sqrt) {
                exist = true;
                expect( typeof (Converter.sqrt)).toBe('function');
            }
        } catch(error) {
            console.log("error while expecting Converter.sqrt to exist:", error);
        } finally {
            expect(exist).toBe(true);
        }
    });
    it("expects sqrt(1) to be 1", function() {
        var actual = Converter.sqrt(1);
        expect(actual).toBe(1);
    });
    it("expects sqrt(-1) to be undefined", function() {
        var actual = Converter.sqrt(-1);
        expect(actual).toBe(undefined);
    });
    it("expects sqrt(1.5) to be 1.224744871", function() {
        var actual = Converter.sqrt(1.5);
        expect(actual).toBeCloseTo(1.224744871);
    });
    it("expects sqrt(4) to be 2", function() {
        var actual = Converter.sqrt(4);
        expect(actual).toBe(2);
    });
    it("expects sqrt(30) to be 5.47722557", function() {
        var actual = Converter.sqrt(30);
        expect(actual).toBeCloseTo(5.47722557);
    });
    it("expects no input to be undefined output", function() {
        var actual = Converter.sqrt();
        expect(actual).toBe(undefined);
    });
    it("expects null input to be undefined output", function() {
        var actual = Converter.sqrt(null);
        expect(actual).toBe(undefined);
    });
    it("expects undefined input to be undefined output", function() {
        var actual = Converter.sqrt(undefined);
        expect(actual).toBe(undefined);
    });
    it("expects non number input to be undefined output", function() {
        var actual = Converter.sqrt("not a number");
        expect(actual).toBe(undefined);
    });
});
