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
var $f_input = $('#f_input'), $fc_button = $('#fc_button'), $c_output = $('#c_output');
var fc_buttonClickHandler = function(event) {"use strict";
    event.preventDefault();
    $c_output.text('');
    $c_output.text(Converter.fahrenheitToCelsius($f_input.val()));
};
var $m_input = $('#m_input'), $mk_button = $('#mk_button'), $k_output = $('#k_output');
var mk_buttonClickHandler = function(event) {"use strict";
    event.preventDefault();
    $k_output.text('');
    $k_output.text(Converter.milesToKilometers($m_input.val()));
};
var $x_input=$('#x_input'), $sqrt_button = $('#sqrt_button'), $sqrtx_output = $('#sqrtx_output');
var sqrt_buttonClickHandler = function(event) {"use strict";
    event.preventDefault();
    $sqrtx_output.text('');
    $sqrtx_output.text(Converter.sqrt($x_input.val()));
};
$fc_button.click(fc_buttonClickHandler);
$mk_button.click(mk_buttonClickHandler);
$sqrt_button.click(sqrt_buttonClickHandler);
