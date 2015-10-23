/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    module.exports = (app) => {
        require('./components/schema/schema-main')(app);
        require('./components/api/api-main')(app);
        require('./common/custom-api-mapping')(app);
    };
})(module, require);