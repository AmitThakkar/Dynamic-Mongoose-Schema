/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module, require) => {
    "use strict";
    const fs = require('fs');
    const TEMP_FOLDER = config.customApiHandlerDirectory;
    class FunctionMaker {
        getApiHandlerFileName(_id) {
            return TEMP_FOLDER + _id + '.js';
        }

        removeOldApiHandler(_id) {
            let apiHandlerFileAbsolutePath = this.getApiHandlerFileName(_id);
            fs.unlink(apiHandlerFileAbsolutePath, (error) => {
                if (error) {
                    logger.error(error);
                }
            });
            delete require.cache[apiHandlerFileAbsolutePath];
        }

        requireApiHandlers(api, callback) {
            let apiHandlerFileAbsolutePath = this.getApiHandlerFileName(api._id);
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
    module.exports = new FunctionMaker();
})(module, require);