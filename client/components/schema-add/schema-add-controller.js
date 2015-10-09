/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaAddController', [
        'SchemaService', '$rootScope',
        function (SchemaService, $rootScope) {
            let schemaAdd = this;
            schemaAdd.types = [
                'String',
                'Number',
                'Array',
                'Object'
            ];
            schemaAdd.ok = () => {
                $rootScope.$modalInstance.close();
            };
            schemaAdd.cancel = () => {
                $rootScope.$modalInstance.dismiss('cancel');
            };
            schemaAdd.addNewColumn = () => {
                schemaAdd.newSchema.columns.push({
                    name: 'field ' + schemaAdd.newSchema.columns.length
                });
            };
            schemaAdd.reset = () => {
                schemaAdd.newSchema = {
                    columns: []
                };
            };
            schemaAdd.save = () => {
                if (!schemaAdd.newSchema.databaseName) {
                    schemaAdd.errorMessage = 'Please provide Database Name';
                    return;
                }
                if (!schemaAdd.newSchema.tableName) {
                    schemaAdd.errorMessage = 'Please provide Table Name';
                    return;
                }
                if (schemaAdd.newSchema.columns.length < 1) {
                    schemaAdd.errorMessage = 'Please provide at-least one Column details';
                    return;
                }
                SchemaService.save(schemaAdd.newSchema)
                    .success((newSchema) => {
                        $rootScope.$emit('schema:added', newSchema);
                        schemaAdd.reset();
                        schemaAdd.ok();
                    })
                    .error((error) => {
                        schemaAdd.errorMessage = error;
                    });
            };
            if (!schemaAdd.newSchema) {
                schemaAdd.reset();
            }
        }
    ]);
})(angular);