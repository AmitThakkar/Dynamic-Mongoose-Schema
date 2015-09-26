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


    /*let Schema = mongoose.model('Schema',
     {
     collectionName: {type: String},
     collectionSchema: {}
     }
     );
     let user = new Schema({
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
     let User = mongoose.model('User', userSchema.collectionSchema);
     });*/
})(require, process);