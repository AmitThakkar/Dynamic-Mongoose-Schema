/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    'use strict';
    let SchemaController = require('./schema-controller');
    module.exports = (app) => {
        app.post('/schema', SchemaController.save);
        app.get('/schema/:limit/:pageNumber', SchemaController.list);
        app.get('/schema/', SchemaController.list);
        app.delete('/schema/:_id', SchemaController.remove);
        app.get('/schema/:_id', SchemaController.get);
        app.put('/schema/:_id', SchemaController.update);
    };
})(module, require);