/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require) => {
    "use strict";
    const fs = require('fs');
    class CustomApiHandler {
        getApiHandlerAbsoluteName(userName, projectName, apiName) {
            return config.customApiHandlerDirectory + userName + '/' + projectName + '/' + apiName + '.js';
        }

        updateApiHandler(api, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (error) {
                    callback(error);
                } else {
                    delete require.cache[apiHandlerAbsolutePath];
                    callback(null);
                }
            });
        }

        saveApiHandler(api, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.writeFile(apiHandlerAbsolutePath, handler, callback);
        }

        getApiHandler(api, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        requireApiHandlers(api) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(api.userName, api.projectName, api.name);
            return require(apiHandlerAbsolutePath);
        }
    }
    module.exports = new CustomApiHandler();
})(module, require);