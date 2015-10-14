/**
 * Created by Amit Thakkar on 10/7/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.filter('range', () => {
        return (input, min, max) => {
            min = parseInt(min);
            max = parseInt(max);
            for (var i = min; i <= max; i++) {
                input.push(i);
            }
            return input;
        };
    });
})(angular);