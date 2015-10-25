/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    module.exports = (app) => {
        require('./common/custom-api-handler')(app);
        require('./components/schema/schema-main')(app);
        require('./components/api/api-main')(app);
    };
})(module, require);