/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('AddSchemaController', [
        'SchemaService', '$rootScope',
        function (SchemaService, $rootScope) {
            let addSchemaController = this;
            addSchemaController.types = [
                'String',
                'Number',
                'Array',
                'Object'
            ];
            addSchemaController.ok = () => {
                $rootScope.$modalInstance.close();
            };
            addSchemaController.cancel = () => {
                $rootScope.$modalInstance.dismiss('cancel');
            };
            addSchemaController.addNewColumn = () => {
                addSchemaController.newSchema.columns.push({
                    name: 'field ' + addSchemaController.newSchema.columns.length
                });
            };
            addSchemaController.reset = () => {
                addSchemaController.newSchema = {
                    columns: []
                };
            };
            addSchemaController.save = () => {
                if (!addSchemaController.newSchema.databaseName) {
                    addSchemaController.errorMessage = 'Please provide Database Name';
                    return;
                }
                if (!addSchemaController.newSchema.tableName) {
                    addSchemaController.errorMessage = 'Please provide Table Name';
                    return;
                }
                if (addSchemaController.newSchema.columns.length < 1) {
                    addSchemaController.errorMessage = 'Please provide at-least one Column details';
                    return;
                }
                SchemaService.save(addSchemaController.newSchema)
                    .success((newSchema) => {
                        $rootScope.$emit('schema:added', newSchema);
                        addSchemaController.reset();
                        addSchemaController.ok();
                    })
                    .error((error) => {
                        addSchemaController.errorMessage = error;
                    });
            };
            if (!addSchemaController.newSchema) {
                addSchemaController.reset();
            }
        }
    ]);
})(angular);