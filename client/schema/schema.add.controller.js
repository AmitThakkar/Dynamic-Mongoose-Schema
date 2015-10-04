/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaAddController', [
        'SchemaService', '$rootScope',
        function (SchemaService, $rootScope) {
            let schemaAddController = this;
            schemaAddController.types = [
                'String',
                'Number',
                'Array',
                'Object'
            ];
            schemaAddController.ok = () => {
                $rootScope.$modalInstance.close();
            };
            schemaAddController.cancel = () => {
                $rootScope.$modalInstance.dismiss('cancel');
            };
            schemaAddController.addNewColumn = () => {
                schemaAddController.newSchema.columns.push({
                    name: 'field ' + schemaAddController.newSchema.columns.length
                });
            };
            schemaAddController.reset = () => {
                schemaAddController.newSchema = {
                    columns: []
                };
            };
            schemaAddController.save = () => {
                if (!schemaAddController.newSchema.databaseName) {
                    schemaAddController.errorMessage = 'Please provide Database Name';
                    return;
                }
                if (!schemaAddController.newSchema.tableName) {
                    schemaAddController.errorMessage = 'Please provide Table Name';
                    return;
                }
                if (schemaAddController.newSchema.columns.length < 1) {
                    schemaAddController.errorMessage = 'Please provide at-least one Column details';
                    return;
                }
                SchemaService.save(schemaAddController.newSchema)
                    .success((newSchema) => {
                        $rootScope.$emit('schema:added', newSchema);
                        schemaAddController.reset();
                        schemaAddController.ok();
                    })
                    .error((error) => {
                        schemaAddController.errorMessage = error;
                    });
            };
            if (!schemaAddController.newSchema) {
                schemaAddController.reset();
            }
        }
    ]);
})(angular);