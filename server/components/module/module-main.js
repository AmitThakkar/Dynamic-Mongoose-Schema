/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    'use strict';
    let ModuleController = require('./module-controller');
    module.exports = (app) => {
        app.post('/module', ModuleController.save);
        app.get('/module/:limit/:pageNumber', ModuleController.list);
        app.get('/module/', ModuleController.list);
        app.delete('/module/:_id', ModuleController.remove);
        app.get('/module/:_id', ModuleController.get);
        app.put('/module/:_id', ModuleController.update);
    };
})(module, require);