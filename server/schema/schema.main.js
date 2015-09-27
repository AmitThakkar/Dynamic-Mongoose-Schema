/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    'use strict';
    let SchemaController = require('./schema.controller');
    module.exports = (app) => {
        app.post('/schema', SchemaController.save);
        app.get('/schema', SchemaController.list);
    };
})(module, require);