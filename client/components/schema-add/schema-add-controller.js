/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaAddController', [
        'SchemaService',
        function (SchemaService) {
            let schemaAdd = this;
            schemaAdd.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('Schema Add', 'schema-add');
            }];
            schemaAdd.types = [
                'String',
                'Number',
                'Array',
                'Object'
            ];
            schemaAdd.addNewColumn = () => {
                schemaAdd.newSchema.columns.push({
                    name: 'field ' + schemaAdd.newSchema.columns.length
                });
            };
            schemaAdd.reset = (isManualReset) => {
                schemaAdd.errorMessage = '';
                if(isManualReset){
                    schemaAdd.successMessage = '';
                }
                schemaAdd.newSchema = {
                    columns: []
                };
            };
            schemaAdd.save = () => {
                schemaAdd.errorMessage = '';
                schemaAdd.successMessage = '';
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
                schemaAdd.newSchema.projectName = 'test';
                schemaAdd.newSchema.userName = 'amitthakkar';
                SchemaService.save(schemaAdd.newSchema)
                    .success(() => {
                        schemaAdd.successMessage = "Your schema has been successfully saved.";
                        schemaAdd.reset(false);
                    })
                    .error((error) => {
                        schemaAdd.errorMessage = error;
                    });
            };
            if (!schemaAdd.newSchema) {
                schemaAdd.reset(false);
            }
        }
    ]);
})(angular);