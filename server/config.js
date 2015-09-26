/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, process) => {
    'use strict';
    let config = {
        mongoDBUrl: 'mongodb://localhost/dynamicSchema',
        logFolder: 'logs',
        logFormat: '{{timestamp}} {{file}}:{{line}} {{message}}',
        environment: 'DEV',
        logLevel: 'trace',
        dateFormat: 'mmmm dd, yyyy HH:MM:ss',
        port: 8080,
        host: 'localhost'
    };
    if (process.env.NODE_ENV && process.env.NODE_ENV == 'QA') {
        config.environment = 'QA';
        config.mongo_url = "mongodb://QAServerIP/dynamicSchema";
    } else if (process.env.NODE_ENV && process.env.NODE_ENV == 'STAGING') {
        config.environment = 'STAGING';
        config.mongoDBUrl = "mongodb://StagingServerIP/dynamicSchema";
    }
    module.exports = config;
})(module, process);