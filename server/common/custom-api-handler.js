/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require, global) => {
    "use strict";
    const fs = require('fs');
    let Api = require('../components/api/api-domain');
    let app;
    class CustomApiHandler {
        getApiHandlerAbsoluteName(userName, projectName, apiName) {
            return config.customApiHandlerDirectory + userName + '/' + projectName + '/api/' + apiName + '.js';
        }

        getModuleHandlerAbsoluteName(userName, projectName, moduleName) {
            return config.customApiHandlerDirectory + userName + '/' + projectName + '/module/' + moduleName + '.js';
        }

        getApiHandler(api, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        getModuleHandler(module, callback) {
            let moduleHandlerAbsolutePath = this.getModuleHandlerAbsoluteName(module.userName, module.projectName, module.name);
            fs.readFile(moduleHandlerAbsolutePath, callback);
        }

        requireApiHandlers(api) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            return require(apiHandlerAbsolutePath);
        }

        removeApiHandler(url, method) {
            let routers = app._router.stack;
            let routerIndex;
            for (let index = 0; index < routers.length; index++) {
                let router = routers[index].route;
                if (router && router.path == url && router.methods[method.toLowerCase()]) {
                    routerIndex = index;
                    index = routers.length;
                }
            }
            routers.splice(routerIndex, 1);
        }

        addApiHandler(api) {
            app[api.method.toLowerCase()](api.newUrl, this.requireApiHandlers(api));
        }

        saveApiHandler(api, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (!error) {
                    this.addApiHandler(api);
                }
                callback(error);
            });
        }

        saveModuleHandler(module, handler, callback) {
            let moduleHandlerAbsolutePath = this.getModuleHandlerAbsoluteName(module.userName, module.projectName, module.name);
            fs.writeFile(moduleHandlerAbsolutePath, handler, (error) => {
                callback(error);
            });
        }

        updateApiHandler(api, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (!error) {
                    delete require.cache[apiHandlerAbsolutePath];
                    this.removeApiHandler(api.url, api.method);
                    this.addApiHandler(api);
                }
                callback(error);
            });
        }

        updateModuleHandler(module, handler, callback) {
            let moduleHandlerAbsolutePath = this.getModuleHandlerAbsoluteName(module.userName, module.projectName, module.name);
            fs.writeFile(moduleHandlerAbsolutePath, handler, (error) => {
                if (!error) {
                    delete require.cache[moduleHandlerAbsolutePath];
                }
                callback(error);
            });
        }
    }

    module.exports = (expressApp) => {
        app = expressApp;
        let customApiHandler = global.customApiHandler = new CustomApiHandler();
        Api.findAll((error, apis) => {
            if (error) {
                logger.error('Custom Route Mapping not running because of ', error);
            } else {
                apis.forEach((api) => {
                    app[api.method.toLowerCase()](api.url, customApiHandler.requireApiHandlers(api));
                });
            }
        });
    };
})(module, require, global);