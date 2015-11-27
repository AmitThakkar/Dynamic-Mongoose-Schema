/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require, global) => {
    "use strict";
    let Schema = require('../components/schema/schema-domain');
    let config = global.config;
    let app;
    const HTTP_STATUS = global.HTTP_STATUS;
    const MongooseSchemaGenerator = require(process.cwd() + '/server/common/mongoose-schema-generator');
    class CURDSchemaHandler {
        getGetRequestHandler(Schema) {
            return (request, response) => {
                let limit = request.params.limit || config.DEFAULT_LIMIT;
                let pageNumber = request.params.pageNumber || config.DEFAULT_PAGE_NUMBER;
                let options = {
                    limit: limit,
                    skip: (pageNumber - 1) * limit
                };
                logger.trace('Getting List with options: ', options);
                Schema.findAll(options, (error, records) => {
                    if (error) {
                        logger.error(error);
                        response.status(500).json(error.message);
                    } else {
                        Schema.countAll((error, count) => {
                            if (error) {
                                logger.error(error);
                                response.status(500).json(error.message);
                            } else {
                                response.status(200).json({
                                    records: records, total: count
                                });
                            }
                        });
                    }
                });
            };
        }

        getGetOneRequestHandler(Schema) {
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

        getDeleteRequestHandler(Schema) {
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

        getPutRequestHandler(Schema) {
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

    module.exports = (expressApp) => {
        app = expressApp;
        let crudSchemaHandler = new CURDSchemaHandler();
        Schema.findAll({__v: 0, isRemoved: 0}, (error, schemas) => {
            if (error) {
                logger.error('CURD Schema Route Mapping not running because of ', error);
            } else {
                schemas.forEach((schema) => {
                    let Schema = MongooseSchemaGenerator.generate(schema);
                    app.get('/' + schema.tableName, crudSchemaHandler.getGetRequestHandler(Schema));
                    app.get('/' + schema.tableName + '/:_id', crudSchemaHandler.getGetOneRequestHandler(Schema));
                    app.delete('/' + schema.tableName, crudSchemaHandler.getDeleteRequestHandler(Schema));
                    app.put('/' + schema.tableName, crudSchemaHandler.getPutRequestHandler(Schema));
                    app.post('/' + schema.tableName, crudSchemaHandler.getPutRequestHandler(Schema));
                });
            }
        });
    };
})(module, require, global);