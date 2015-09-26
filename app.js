/**
 * Created by Amit Thakkar on 9/24/15.
 */
((require, process) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const config = require('./server/config');
    const logger = global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });

    logger.info('Starting Application in =>', config.environment, 'Environment');

    let app = express();
    app.use((req, res, next) => {
        logger.debug("Request:", req.url, 'Method:', req.method);
        next();
    });

    app.use(express.static('client'));
    app.use(express.static('bower_components'));
    require('./server/routeMapping')(app);

    mongoose.connect('mongodb://localhost/test', (error) => {
        if (error) {
            logger.error('Failed to connect with MongoDB', error);
        } else {
            logger.info('Connected with MongoDB Server');
        }
    });

    const port = process.env.PORT || config.port;
    const server = app.listen(port, () => {
        logger.info('Dynamic Schema app listening at http://%s:%s', config.host, port);
    });


    /*


     Schema.findOne({collectionName: 'User'}, {collectionSchema: 1, _id: 0}).lean().exec(function (error, userSchema) {
     console.log(userSchema.collectionSchema);
     let User = mongoose.model('User', userSchema.collectionSchema);
     });*/
})(require, process);