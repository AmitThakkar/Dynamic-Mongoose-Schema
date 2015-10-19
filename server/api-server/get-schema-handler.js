/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, global) => {
    "use strict";
    class GetSchemaHandler {
        handle(dataObject, client) {
            global.getSchema(dataObject.databaseName, dataObject.tableName, (schema) => {
                schema[dataObject.methodName](dataObject.arguments, function () {
                    client.write(JSON.stringify({
                        'callbackCount': dataObject.callbackCount,
                        'result': arguments
                    }));
                });
            });
        }
    }
    module.exports = new GetSchemaHandler();
})(module, global);