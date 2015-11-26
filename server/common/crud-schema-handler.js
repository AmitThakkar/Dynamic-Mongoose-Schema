/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require, global) => {
    "use strict";
    const API_METHODS = [
        "get",
        "delete",
        "post",
        "put"
    ];
    let Schema = require('../components/schema/schema-domain');
    let app;
    const HTTP_STATUS = global.HTTP_STATUS;
    const MongooseSchemaGenerator = require(process.cwd() + '/server/common/mongoose-schema-generator');
    class CURDSchemaHandler {
        getHandler(method, Schema) {
            switch (method) {
                case API_METHODS[0] :
                    return (request, response) => {
                        Schema.findAll((error, document) => {
                            if (error) {
                                logger.error(error);
                                response.status(HTTP_STATUS.ERROR).json(error.message);
                            } else {
                                response.status(HTTP_STATUS.SUCCESS).json(document);
                            }
                        });
                    };
                case API_METHODS[1] :
                    return (request, response) => {
                        let _id = request.params._id;
                        Schema.findOneById(_id, (error, document) => {
                            if (error) {
                                logger.error(error);
                                response.status(HTTP_STATUS.ERROR).json(error.message);
                            } else {
                                response.status(HTTP_STATUS.SUCCESS).json(document);
                            }
                        });
                    };
                case API_METHODS[2] :
                    return (request, response) => {
                        let _id = request.params._id;
                        Schema.findOneById(_id, (error, document) => {
                            if (error) {
                                logger.error(error);
                                response.status(HTTP_STATUS.ERROR).json(error.message);
                            } else {
                                response.status(HTTP_STATUS.SUCCESS).json(document);
                            }
                        });
                    };
                case API_METHODS[3] :
                    return (request, response) => {
                        let _id = request.params._id;
                        Schema.findOneById(_id, (error, document) => {
                            if (error) {
                                logger.error(error);
                                response.status(HTTP_STATUS.ERROR).json(error.message);
                            } else {
                                response.status(HTTP_STATUS.SUCCESS).json(document);
                            }
                        });
                    };
            }
        }
    }

    module.exports = (expressApp) => {
        app = expressApp;
        let crudSchemaHandler = global.crudSchemaHandler = new CURDSchemaHandler();
        Schema.findAll({__v: 0, isRemoved: 0}, (error, schemas) => {
            if (error) {
                logger.error('CURD Schema Route Mapping not running because of ', error);
            } else {
                schemas.forEach((schema) => {
                    API_METHODS.forEach((method) => {
                        app[method]('/' + schema.tableName, crudSchemaHandler.getHandler(method, MongooseSchemaGenerator.generate(schema)));
                    });
                });
            }
        });
    };
})(module, require, global);