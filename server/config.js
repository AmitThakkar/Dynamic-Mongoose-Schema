/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, process) => {
    'use strict';
    let config = {
        mongoDBUrl: 'mongodb://localhost/dynamicSchema',
        logFolder: 'logs',
        logFormat: 'Process PID: ' + process.pid + ' {{timestamp}} {{file}}:{{line}} {{message}}',
        environment: 'DEV',
        logLevel: 'trace',
        dateFormat: 'mmmm dd, yyyy HH:MM:ss',
        DEFAULT_LIMIT: 10,
        DEFAULT_PAGE_NUMBER: 1,
        port: 8080,
        isClusterEnvironment: false,
        host: 'localhost'
    };
    if (process.env.NODE_ENV && process.env.NODE_ENV == 'QA') {
        config.environment = 'QA';
        config.isClusterEnvironment = true;
        config.mongo_url = "mongodb://QAServerIP/dynamicSchema";
    } else if (process.env.NODE_ENV && process.env.NODE_ENV == 'STAGING') {
        config.environment = 'STAGING';
        config.isClusterEnvironment = true;
        config.mongoDBUrl = "mongodb://StagingServerIP/dynamicSchema";
    } else if (process.env.NODE_ENV && process.env.NODE_ENV == 'PRODUCTION') {
        config.environment = 'PRODUCTION';
        config.isClusterEnvironment = true;
        config.mongoDBUrl = "mongodb://ProductionServerIP/dynamicSchema";
    }
    module.exports = config;
})(module, process);