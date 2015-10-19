/**
 * Created by Amit Thakkar on 10/18/15.
 */
((require) => {
    "use strict";
    const net = require('net');
    const PORT = process.env.API_PORT || config.API_PORT;
    var server = net.createServer(function (connection) { //'connection' listener
        logger.info('Connected with a client');
        connection.on('end', function () {
            logger.info('Disconnected with client');
        });
        connection.write('hello\r\n');
        connection.on('data', function (data) {
            console.log("Data", data.toString())
        });
        connection.pipe(connection);
    });
    server.listen(PORT, function () {
        logger.info('API Server listening at %s:%s', config.host, PORT);
    });
})(require);