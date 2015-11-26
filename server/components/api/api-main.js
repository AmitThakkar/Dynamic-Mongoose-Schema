/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    'use strict';
    let ApiController = require('./api-controller');
    module.exports = (app) => {
        app.post('/api', ApiController.save);
        app.get('/api/:limit/:pageNumber', ApiController.list);
        app.get('/api/', ApiController.list);
        app.delete('/api/:_id', ApiController.remove);
        app.get('/api/:_id', ApiController.get);
        app.put('/api/:_id', ApiController.update);
    };
})(module, require);