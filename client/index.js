/**
 * Created by Amit Thakkar on 9/26/15.
 */
((ng) => {
    "use strict";
    var dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema', []);
    dynamicMongooseSchemaModule.controller('SchemaController', [function () {
        let schemaController = this;
        schemaController.types = [
            "String",
            "Number",
            "Object"
        ];
        if (!schemaController.newSchema) {
            schemaController.newSchema = {
                columns: []
            };
        }
        schemaController.addNewColumn = () => {
            schemaController.newSchema.columns.push({
                name: "field " + schemaController.newSchema.columns.length
            });
        };
    }]);
})(angular);