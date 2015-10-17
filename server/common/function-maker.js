/**
 * Created by Amit Thakkar on 10/14/15.
 */
((module) => {
    "use strict";
    const fs = require('fs');
    const TEMP_FOLDER = config.customApiHandlerDirectory;
    class FunctionMaker {
        getFunctionsFromStringFunctions(fileName, stringFunctions, callback) {
            let apiHandlerFileAbsolutePath = TEMP_FOLDER + fileName + '.js';
            fs.exists(apiHandlerFileAbsolutePath, (exists) => {
                if (exists) {
                    callback(require(apiHandlerFileAbsolutePath));
                } else {
                    let moduleString = 'module.exports={';
                    let postfix = '}';
                    stringFunctions.forEach((stringFunction, functionIndex) => {
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
})(module);