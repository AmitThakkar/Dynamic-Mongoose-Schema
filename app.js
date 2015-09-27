/**
 * Created by Amit Thakkar on 9/24/15.
 */
((require, process) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const config = require('./server/config');
    const bodyParser = require('body-parser');
    const logger = global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });
    const MongooseSchemaGenerator = require('./server/MongooseSchemaGenerator');

    logger.info('Starting Application in =>', config.environment, 'Environment');

    let app = express();
    app.use((req, res, next) => {
        logger.debug('Request:', req.url, 'Method:', req.method);
        next();
    });

    app.use(express.static('client'));
    app.use(express.static('bower_components'));
    app.use(bodyParser.json());
    require('./server/routeMapping')(app);

    mongoose.connect(config.mongoDBUrl, (error) => {
        if (error) {
            logger.error('Failed to connect with MongoDB', error);
        } else {
            logger.info('Connected with MongoDB Server on ', config.mongoDBUrl);
        }
    });

    const port = process.env.PORT || config.port;
    const server = app.listen(port, () => {
        logger.info('Dynamic Schema app listening at http://%s:%s', config.host, port);
    });

    let Schema = require('./server/schema/schema.domain');
    let databaseName = 'amps';
    let tableName = 'user';
    Schema.findOne({databaseName: databaseName, tableName: tableName}, {
        _id: 0,
        columns: 1
    }, function (error, table) {
        if (error) {
            logger.error(error);
        } else {
            logger.debug(table);
            let DynamicSchema = mongoose.model(databaseName + tableName, MongooseSchemaGenerator.generate(table.columns));
            new DynamicSchema({
                name: 'Amit',
                age: 23,
                email: 'asdf',
                test: 232
            }).save(function () {
                    logger.debug(arguments)
                })
        }
    });
})(require, process);