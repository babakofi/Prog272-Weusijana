var Converter = {
    mileInKilometers : 1.60934,
    milesToKilometers : function(miles) {"use strict";
        if (miles) {
            if (isNaN(miles)) {
                return;
            }
            return miles * this.mileInKilometers;
        }
    },
    fahrenheitToCelsius : function(fahrenheit) {"use strict";
        if (fahrenheit) {
            if (isNaN(fahrenheit)) {
                return;
            }
            return (fahrenheit - 32) * (5 / 9);
        }
    },
    sqrt : function(x) {"use strict";
        if (x) {
            if (isNaN(x)) {
                return;
            }
            if (x < 0) {
                return;
            }
            return Math.sqrt(x);
        }
    }
};
