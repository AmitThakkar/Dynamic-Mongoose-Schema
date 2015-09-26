/**
 * Created by Amit Thakkar on 9/26/15.
 */
((ng) => {
    'use strict';
    var dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema', []);
    dynamicMongooseSchemaModule.service('SchemaService', ['$http', function($http) {
        let schemaService = this;
        const URL = 'schema';
        schemaService.save = (newSchema) => {
            return $http.post(URL, newSchema)
        };
    }]);
    dynamicMongooseSchemaModule.controller('SchemaController', ['SchemaService', function (SchemaService) {
        let schemaController = this;
        schemaController.types = [
            'String',
            'Number',
            'Object'
        ];
        schemaController.addNewColumn = () => {
            schemaController.newSchema.columns.push({
                name: 'field ' + schemaController.newSchema.columns.length
            });
        };
        schemaController.reset = () => {
            schemaController.newSchema = {
                columns: []
            };
        };
        schemaController.save = () => {
            if (!schemaController.newSchema.dbName) {
                schemaController.errorMessage = 'Please provide Database Name';
                return;
            }
            if (!schemaController.newSchema.tableName) {
                schemaController.errorMessage = 'Please provide Table Name';
                return;
            }
            if (schemaController.newSchema.columns.length < 1) {
                schemaController.errorMessage = 'Please provide at-least one Column details';
                return;
            }
            SchemaService.save(schemaController.newSchema)
                .success(() => {
                    console.log(schemaController.newSchema);
                })
                .error((error) => {
                    schemaController.errorMessage = error;
                });
        };
        if (!schemaController.newSchema) {
            schemaController.reset();
        }
    }]);
})(angular);