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
})(require, module);