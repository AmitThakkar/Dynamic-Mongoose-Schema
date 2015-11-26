/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    module.exports = (app) => {
        require('./common/custom-api-handler')(app);
        require('./common/crud-schema-handler')(app);
        require('./components/schema/schema-main')(app);
        require('./components/api/api-main')(app);
        require('./components/module/module-main')(app);
    };
})(module, require);