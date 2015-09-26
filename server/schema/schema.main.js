/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    'use strict';
    let SchemaController = require('./schema.controller');
    module.exports = (app) => {
        app.post('/schema', SchemaController.save);
    };
})(module, require);