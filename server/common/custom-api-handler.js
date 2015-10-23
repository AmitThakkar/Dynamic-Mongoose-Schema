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

        updateApiHandler(userName, projectName, apiName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(userName, projectName, apiName);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (error) {
                    callback(error);
                } else {
                    delete require.cache[apiHandlerAbsolutePath];
                    callback(null);
                }
            });
        }

        saveApiHandler(userName, projectName, apiName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(userName, projectName, apiName);
            fs.writeFile(apiHandlerAbsolutePath, handler, callback);
        }

        getApiHandler(userName, projectName, apiFileName, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(userName, projectName, apiFileName);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        requireApiHandlers(userName, projectName, apiName) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(userName, projectName, apiName);
            return require(apiHandlerAbsolutePath);
        }
    }
    module.exports = new CustomApiHandler();
})(module, require);