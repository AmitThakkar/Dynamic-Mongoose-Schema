/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require) => {
    "use strict";
    const fs = require('fs');
    class CustomApiHandler {
        getApiHandlerAbsoluteName(apiFileName) {
            return config.customApiHandlerDirectory + apiFileName + '.js';
        }

        removeOldApiHandler(_id) {
            let apiHandlerFileAbsolutePath = this.getApiHandlerAbsoluteName(_id);
            fs.unlink(apiHandlerFileAbsolutePath, (error) => {
                if (error) {
                    logger.error(error);
                }
            });
            delete require.cache[apiHandlerFileAbsolutePath];
        }

        saveApiHandler(apiFileName, handler, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(apiFileName);
            fs.writeFile(apiHandlerAbsolutePath, handler, callback);
        }

        getApiHandler(apiFileName, callback) {
            let apiHandlerAbsolutePath = this.getApiHandlerAbsoluteName(apiFileName);
            fs.readFile(apiHandlerAbsolutePath, callback);
        }

        requireApiHandlers(api, callback) {
            let apiHandlerFileAbsolutePath = this.getApiHandlerAbsoluteName(api._id);
            fs.exists(apiHandlerFileAbsolutePath, (exists) => {
                if (exists) {
                    callback(require(apiHandlerFileAbsolutePath));
                } else {
                    let moduleString = 'module.exports={';
                    let postfix = '}';
                    api.handlers.forEach((stringFunction, functionIndex) => {
                        moduleString += '"' + functionIndex + '":' + stringFunction + ',';
                    });
                    moduleString = moduleString.replace(/,$/, '');
                    moduleString += postfix;
                    fs.writeFile(apiHandlerFileAbsolutePath, moduleString, () => {
                        callback(require(apiHandlerFileAbsolutePath));
                    });
                }
            });
        }
    }
    module.exports = new CustomApiHandler();
})(module, require);