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
    const responseTime = require('response-time');
    const cluster = require('cluster');
    const MONGODB_RECONNECT_TIME_INTERVAL = 5000;
    const NUMBER_OF_CPUs = require('os').cpus().length;
    const logger = global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });
    const MongooseSchemaGenerator = require('./server/MongooseSchemaGenerator');
    logger.info('Starting Application in =>', config.environment, 'Environment');
    if (cluster.isMaster && config.isClusterEnvironment) {
        logger.debug('Starting', NUMBER_OF_CPUs, 'Node Servers!');
        for (var coreIndex = 0; coreIndex < NUMBER_OF_CPUs; coreIndex++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) => {
            logger.error('worker ' + worker.process.pid + ' died');
        });
    } else {
        let app = express();
        app.use((req, res, next) => {
            logger.trace(req.method, '=>', req.url);
            let startTime = Date.now();
            res.on('finish', function () {
                let responseTime = Date.now() - startTime;
                logger.trace(req.method, '=>', req.url, 'Response Time:', responseTime);
            });
            next();
        });
        app.use(responseTime());
        let db;
        let connectWithRetry = (cb) => {
            mongoose.connect(config.mongoDBUrl, (error) => {
                if (error) {
                    db.close();
                    logger.error('Failed to connect with MongoDB', error);
                } else {
                    logger.info('Connected with MongoDB Server on ', config.mongoDBUrl);
                }
            });
            db = mongoose.connection;
            cb && cb();
        };
        connectWithRetry(function () {
            db.on('error', function (error) {
                logger.error('Mongoose Error: ', error);
            });
            db.on('connected', function () {
                logger.info('Mongoose Connected to ', config.mongoDBUrl);
            });
            db.once('open', function () {
                logger.info('Mongoose Connection Open with MongoDB Server on ', config.mongoDBUrl);
            });
            db.on('disconnected', function () {
                logger.info('Mongoose connection disconnected');
                setTimeout(connectWithRetry, MONGODB_RECONNECT_TIME_INTERVAL);
            });
        });
        app.use(express.static('client'));
        app.use(express.static('bower_components'));
        app.use(bodyParser.json());
        require('./server/routeMapping')(app);
        const port = process.env.PORT || config.port;
        const server = app.listen(port, () => {
            logger.info('Dynamic Schema app listening at http://%s:%s', config.host, port);
        });
    }
    /*let Schema = require('./server/schema/schema.domain');
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
     /!*new DynamicSchema({
     name: 'Amit',
     age: 23,
     email: 'asdf',
     test: 232
     }).save(function () {
     logger.debug(arguments)
     });*!/
     }
     });*/
})(require, process);