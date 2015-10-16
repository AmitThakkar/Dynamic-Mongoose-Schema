/**
 * Created by Amit Thakkar on 10/14/15.
 */
((process, module) => {
    "use strict";
    const fs = require('fs');
    const TEMP_FOLDER = process.cwd() + '/temp/';
    class FunctionMaker {
        writeIntoFile(stringFunctions, callback) {
            let nowFileName = TEMP_FOLDER + Date.now() + '.js';
            let moduleString = 'module.exports={';
            let postfix = '}';
            stringFunctions.forEach((stringFunction, functionIndex) => {
                moduleString += '"' + functionIndex + '":' + stringFunction + ',';
            });
            moduleString = moduleString.replace(/,$/, '');
            moduleString += postfix;
            fs.writeFile(nowFileName, moduleString, () => {
                callback(nowFileName);
            });
        }

        getFunctionsFromStringFunctions(stringFunctions, callback) {
            this.writeIntoFile(stringFunctions, (fileName) => {
                callback(require(fileName));
            });
        }
    }
    module.exports = new FunctionMaker();
})(process, module);