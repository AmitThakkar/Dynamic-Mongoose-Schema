/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require) => {
    "use strict";
    const fs = require('fs');
    class CustomApiHandler {
        getApiHandlerAbsoluteName(projectName, apiName) {
            return config.customApiHandlerDirectory + projectName + '/' + apiName + '.js';
        }

        updateApiHandler(projectName, apiName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiName);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (error) {
                    callback(error);
                } else {
                    delete require.cache[apiHandlerAbsolutePath];
                    callback(null);
                }
            });
        }

        saveApiHandler(projectName, apiName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiName);
            fs.writeFile(apiHandlerAbsolutePath, handler, callback);
        }

        getApiHandler(projectName, apiFileName, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiFileName);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        requireApiHandlers(projectName, apiName) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiName);
            return require(apiHandlerAbsolutePath);
        }
    }
    module.exports = new CustomApiHandler();
})(module, require);