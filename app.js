/**
 * Created by Amit Thakkar on 9/24/15.
 */
(function (require) {
    // Requiring Dependencies
    var hapi = require('hapi');
    var mongoose = require('mongoose');
    var config = require('./server/config');
    var logger = global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });

    logger.info('Starting Application in =>', config.environment, 'Environment');

    mongoose.connect('mongodb://localhost/test', function(error) {
        if (error) {
            logger.error('Failed to connect with MongoDB', error);
        } else {
            logger.info('Connected with MongoDB Server');
        }
    });

    var server = new hapi.Server();
    server.connection({
        host: 'localhost',
        port: 8000
    });
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply('hello world');
        }
    });
    server.start(function () {
        logger.info('Server running at:', server.info.uri);
    });


    /*var Schema = mongoose.model('Schema',
        {
            collectionName: {type: String},
            collectionSchema: {}
        }
    );
    var user = new Schema({
        collectionName: 'User',
        collectionSchema: {
            name: {type: "String", required: true, uppercase: true, trim: true, index: true, select: false},
            email: {type: "String", required: true, lowercase: true, trim: true, match: "", unique: true},
            password: {type: "", required: false, default: "defaultPassword"},
            age: {type: "Number", min: 10, max: 20, required: false},
            dob: {type: "Number"},
            sex: {type: "String", enum: ["M", "F"]}
        }
    });
    user.save(function (error) {
        if (error) {
            console.log('User Schema saved Error', error);
        } else {
            console.log('User Schema saved');
        }
    });
    Schema.findOne({collectionName: 'User'}, {collectionSchema: 1, _id: 0}).lean().exec(function (error, userSchema) {
        console.log(userSchema.collectionSchema);
        var User = mongoose.model('User', userSchema.collectionSchema);
    });*/
})(require);