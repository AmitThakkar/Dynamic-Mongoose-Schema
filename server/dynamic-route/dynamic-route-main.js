/**
 * Created by Amit Thakkar on 10/13/15.
 */
((module, require) => {
    'use strict';
    let DynamicRouteController = require('./dynamic-route-controller');
    module.exports = (app) => {
        app.all('/*', DynamicRouteController.handler);
    };
})(module, require);
