/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require) => {
    "use strict";
    const fs = require('fs');
    class CustomApiHandler {
        getApiHandlerAbsoluteName(projectName, apiFileName) {
            return config.customApiHandlerDirectory + projectName + '/' + apiFileName + '.js';
        }

        updateApiHandler(projectName, apiFileName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiFileName);
            fs.writeFile(apiHandlerAbsolutePath, handler, (error) => {
                if (error) {
                    callback(error);
                } else {
                    delete require.cache[apiHandlerAbsolutePath];
                    callback(null);
                }
            });
        }

        saveApiHandler(projectName, apiFileName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiFileName);
            fs.writeFile(apiHandlerAbsolutePath, handler, callback);
        }

        getApiHandler(projectName, apiFileName, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiFileName);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        requireApiHandlers(projectName, apiFileName) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(projectName, apiFileName);
            return require(apiHandlerAbsolutePath);
        }
    }
    module.exports = new CustomApiHandler();
})(module, require);