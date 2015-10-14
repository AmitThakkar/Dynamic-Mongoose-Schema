/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    module.exports = (app) => {
        require('./components/schema/schema-main')(app);
        // This route must be last to handle all the request.
        require('./components/api/api-main')(app);
    };
})(module, require);