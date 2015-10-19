/**
 * Created by Amit Thakkar on 10/18/15.
 */
((require, process) => {
    "use strict";
    const net = require('net');
    const PORT = process.env.API_PORT || config.API_PORT;
    const GET_SCHEMA_HANDLER = require('./get-schema-handler');
    let server = net.createServer(function (connection) {
        logger.info('Connected with a client');
        connection.on('end', function () {
            logger.info('Disconnected with client');
        });
        connection.on('data', function (data) {
            let dataObject = JSON.parse(data);
            switch (dataObject.eventName) {
                case 'getSchema' :
                    GET_SCHEMA_HANDLER.handle(dataObject, connection);
                    break;
            }
        });
        connection.pipe(connection);
    });
    server.listen(PORT, function () {
        logger.info('API Server listening at %s:%s', config.host, PORT);
    });
})(require, process);