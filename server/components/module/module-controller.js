/**
 * Created by Amit Thakkar on 9/25/15.
 */
((require, module, config, process, global)=> {
    "use strict";
    let Module = require('./module-domain');
    let customApiHandler = global.customApiHandler;
    let exports = module.exports;
    const HTTP_STATUS = global.HTTP_STATUS;
    exports.save = (request, response) => {
        let requestBody = request.body;
        let newModule = new Module(requestBody);
        newModule.save((error) => {
            if (error) {
                logger.error(error);
                if (error.code == 11000) {
                    response.status(HTTP_STATUS.ERROR).json({message: "Module already present."});
                } else {
                    response.status(HTTP_STATUS.ERROR).json({message: error.message});
                }
            } else {
                customApiHandler.saveModuleHandler(requestBody, requestBody.handler, (error) => {
                    if (error) {
                        logger.error(error);
                        response.status(HTTP_STATUS.ERROR).json({message: error.message});
                    } else {
                        response.status(HTTP_STATUS.SUCCESS).json(newModule);
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
        logger.trace('Getting Module List with options: ', options);
        Module.findAll(options, (error, modules) => {
            if (error) {
                logger.error(error);
                response.status(500).json(error.message);
            } else {
                Module.countAll((error, count) => {
                    if (error) {
                        logger.error(error);
                        response.status(500).json(error.message);
                    } else {
                        response.status(200).json({
                            modules: modules, total: count
                        });
                    }
                });
            }
        });
    };
    exports.get = (request, response) => {
        let _id = request.params._id;
        Module.findOneById(_id, (error, module) => {
            if (error) {
                logger.error(error);
                response.status(HTTP_STATUS.ERROR).json(error.message);
            } else {
                module.handler = customApiHandler.getModuleHandler(module, (error, handler) => {
                    if (error) {
                        logger.error(error);
                        response.status(HTTP_STATUS.ERROR).json(error.message);
                    } else {
                        module.handler = handler.toString();
                        response.status(HTTP_STATUS.SUCCESS).json(module);
                    }
                });
            }
        });
    };
    exports.remove = (request, response) => {
        let _id = request.params._id;
        Module.removeById(_id, (error, result) => {
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
        var updatedModuleFields = request.body;
        Module.findOneByIdAndUpdate(_id, updatedModuleFields, (error, module) => {
            if (error) {
                logger.error(error);
                response.status(HTTP_STATUS.ERROR).json(error.message);
            } else {
                if (!module) {
                    logger.debug('No Record Found with _id', _id);
                    response.status(HTTP_STATUS.ERROR).json({
                        message: 'No Record Found with _id ' + _id
                    });
                } else {
                    module.newUrl = updatedModuleFields.url || module.url;
                    customApiHandler.updateModuleHandler(module, updatedModuleFields.handler, (error) => {
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
    Module.findAll((error, modules) => {
        global.apiServer.modules = {};
        if (error) {
            logger.error(error);
        } else if (!modules || modules.length == 0) {
            logger.info('No common module fount!');
        } else {
            modules.forEach((module) => {
                global.apiServer.modules[module.name] = customApiHandler.requireModuleHandlers(module);
            });
            console.log(global.apiServer.modules.test);
        }
    });
})(require, module, config, process, global);