/**
 * Created by Amit Thakkar on 9/25/15.
 */
((require, module)=> {
    "use strict";
    let Schema = require('./schema.domain');
    module.exports.save = (request, response) => {
        var newSchema = request.body;
        new Schema(newSchema).save((error) => {
            if (error) {
                logger.error(error);
                if (error.code == 11000) {
                    response.status(500).json("Table already present.");
                } else {
                    response.status(500).json(error.message);
                }
            } else {
                response.status(200).json(newSchema);
            }
        });
    };
    module.exports.list = (request, response) => {
        Schema.findAll((error, schemas) => {
            if (error) {
                logger.error(error);
                response.status(500).json(error.message);
            } else {
                response.status(200).json(schemas);
            }
        });
    };
    module.exports.remove = (request, response) => {
        let _id = request.params._id;
        Schema.softRemove(_id, (error, result) => {
            if (error) {
                logger.error(error);
                response.status(500).json(error.message);
            } else {
                if (result.n == 0) {
                    logger.debug('No Record Found with _id', _id);
                    response.status(200).json({
                        isSuccess: false,
                        message: 'No Record Found with _id ' + _id
                    });
                } else if (result.nModified == 0) {
                    logger.debug('Record has already removed with _id ', _id);
                    response.status(200).json({
                        isSuccess: false,
                        message: 'Record has already removed with _id ' + _id
                    });
                } else {
                    response.status(200).json({
                        isSuccess: true,
                        message: 'Record Update with _id ' + _id
                    });
                }
            }
        });
    };
})(require, module);