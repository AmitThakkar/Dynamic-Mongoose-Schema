/**
 * Created by Amit Thakkar on 10/14/15.
 */
((process) => {
    "use strict";
    const fs = require('fs');
    const TEMP_FOLDER = process.cwd() + '/';
    class FunctionMaker {
        writeIntoFile(writeIntoFile, callback) {
            let nowFileName = TEMP_FOLDER + Date.now() + '.js';
            var nowFile = fs.createWriteStream(nowFileName);
            nowFile.write(writeIntoFile, function () {
                callback(nowFileName);
            });
        }

        getFunctionFromString(functionString, callback) {
            this.writeIntoFile(functionString, function (fileName) {
                callback(require(fileName));
            });
        }
    }
    module.exports = new FunctionMaker();
})(process);