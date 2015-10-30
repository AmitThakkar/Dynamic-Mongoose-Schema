/**
 * Created by Amit Thakkar on 10/19/15.
 */
((module, global) => {
    "use strict";
    class GetSchemaHandler {
        handle(dataObject, client) {
            global.apiServer.getSchema(dataObject.databaseName, dataObject.tableName, (schema) => {
                dataObject.arguments.push(function () {
                    client.write(JSON.stringify({
                        'callbackCount': dataObject.callbackCount,
                        'result': [].slice.call(arguments)
                    }));
                });
                schema[dataObject.methodName].apply(schema, dataObject.arguments);
            });
        }
    }
    module.exports = new GetSchemaHandler();
})(module, global);