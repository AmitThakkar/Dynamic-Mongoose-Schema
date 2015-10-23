/**
 * Created by Amit Thakkar on 10/23/15.
 */
((module, require) => {
    "use strict";
    let CustomApiHandler = require('./custom-api-handler');
    let Api = require('../components/api/api-domain');
    module.exports = (app) => {
        Api.findAll((error, apis) => {
            if(error) {
                logger.error('Custom Route Mapping not running because of ', error);
            } else {
                apis.forEach((api) => {
                    app[api.method.toLowerCase()](api.url, CustomApiHandler.requireApiHandlers(api.projectName, api.name));
                });
            }
        });
    };
})(module, require);