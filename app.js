/**
 * Created by Amit Thakkar on 9/24/15.
 */
((require, process, global) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    const mongoose = require('mongoose');
    const config = global.config = require('./server/config');
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
        const PORT = process.env.PORT || config.port;
        const server = app.listen(PORT, () => {
            logger.info('Dynamic Schema app listening at http://%s:%s', config.host, PORT);
        });
        require('./server/api-server/index');
    }
})(require, process, global);