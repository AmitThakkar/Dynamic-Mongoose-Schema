/**
 * Created by Amit Thakkar on 9/25/15.
 */
((require, module, config, process, global)=> {
    "use strict";
    let Api = require('./api-domain');
    let customApiHandler = global.customApiHandler;
    let exports = module.exports;
    const HTTP_STATUS = global.HTTP_STATUS;
    exports.save = (request, response) => {
        let requestBody = request.body;
        let newApi = new Api(requestBody);
        newApi.save((error) => {
            if (error) {
                logger.error(error);
                if (error.code == 11000) {
                    response.status(HTTP_STATUS.ERROR).json({message: "API already present."});
                } else {
                    response.status(HTTP_STATUS.ERROR).json({message: error.message});
                }
            } else {
                customApiHandler.saveApiHandler(requestBody, requestBody.handler, (error) => {
                    if (error) {
                        logger.error(error);
                        response.status(HTTP_STATUS.ERROR).json({message: error.message});
                    } else {
                        response.status(HTTP_STATUS.SUCCESS).json(newApi);
                    }
                });
            }
        });
    };
    exports.list = (request, response) => {
        let limit = request.params.limit || config.DEFAULT_LIMIT;
        let pageNumber = request.params.pageNumber || config.DEFAULT_PAGE_NUMBER;
        let options = {
            limit: limit,
            skip: (pageNumber - 1) * limit
        };
        logger.trace('Getting Api List with options: ', options);
        Api.findAll(options, (error, Apis) => {
            if (error) {
                logger.error(error);
                response.status(500).json(error.message);
            } else {
                Api.countAll((error, count) => {
                    if (error) {
                        logger.error(error);
                        response.status(500).json(error.message);
                    } else {
                        response.status(200).json({
                            apis: Apis, total: count
                        });
                    }
                });
            }
        });
    };
    exports.get = (request, response) => {
        let _id = request.params._id;
        Api.findOneById(_id, (error, api) => {
            if (error) {
                logger.error(error);
                response.status(HTTP_STATUS.ERROR).json(error.message);
            } else {
                api.handler = customApiHandler.getApiHandler(api, (error, handler) => {
                    if (error) {
                        logger.error(error);
                        response.status(HTTP_STATUS.ERROR).json(error.message);
                    } else {
                        api.handler = handler.toString();
                        response.status(HTTP_STATUS.SUCCESS).json(api);
                    }
                });
            }
        });
    };
    exports.remove = (request, response) => {
        let _id = request.params._id;
        Api.softRemove(_id, (error, result) => {
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
    exports.update = (request, response) => {
        let _id = request.params._id;
        var updatedApiFields = request.body;
        Api.findOneByIdAndUpdate(_id, updatedApiFields, (error, api) => {
            if (error) {
                logger.error(error);
                response.status(HTTP_STATUS.ERROR).json(error.message);
            } else {
                if (!api) {
                    logger.debug('No Record Found with _id', _id);
                    response.status(HTTP_STATUS.ERROR).json({
                        message: 'No Record Found with _id ' + _id
                    });
                } else {
                    api.newUrl = updatedApiFields.url || api.url;
                    customApiHandler.updateApiHandler(api, updatedApiFields.handler, (error) => {
                        if (error) {
                            logger.error(error);
                            response.status(HTTP_STATUS.ERROR).json(error.message);
                        } else {
                            response.status(HTTP_STATUS.SUCCESS).json({
                                message: 'Record Update with _id ' + _id
                            });
                        }
                    });
                }
            }
        });
    };
})(require, module, config, process, global);