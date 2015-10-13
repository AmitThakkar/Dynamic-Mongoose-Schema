/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    module.exports = (app) => {
        require('./schema/schema-main')(app);
        require('./dynamic-route/dynamic-route-main')(app);
    };
})(module, require);