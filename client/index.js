/**
 * Created by Amit Thakkar on 9/26/15.
 */
((ng) => {
    'use strict';
    class MongooseSchemaGenerator {
        generate(columns) {
            let dynamicSchema = {};
            columns.forEach(function (column) {
                let field = dynamicSchema[column.name] = {};
                field.type = column.type;
                field.required = column.required == 'true';
                column.letterCase == 'L' ? column.lowercase = true : '';
                column.letterCase == 'U' ? column.uppercase = true : '';
                field.trim = column.trim == 'true';
                field.unique = column.unique == 'true';
                field.index = column.index == 'true';
            });
            return dynamicSchema;
        }
    }
    let mongooseSchemaGenerator = new MongooseSchemaGenerator();
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema', []);
    dynamicMongooseSchemaModule.service('SchemaService', ['$http', function ($http) {
        let schemaService = this;
        const URL = 'schema';
        schemaService.save = (newSchema) => {
            return $http.post(URL, newSchema)
        };
        schemaService.list = () => {
            return $http.get(URL)
        };
    }]);
    dynamicMongooseSchemaModule.controller('SchemaController', [
        'SchemaService', '$rootScope',
        function (SchemaService, $rootScope) {
            let schemaController = this;
            schemaController.types = [
                'String',
                'Number',
                'Array',
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
                if (!schemaController.newSchema.databaseName) {
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
                        $rootScope.$emit('schema:added', schemaController.newSchema);
                        schemaController.reset();
                    })
                    .error((error) => {
                        schemaController.errorMessage = error;
                    });
            };
            if (!schemaController.newSchema) {
                schemaController.reset();
            }
        }]);
    dynamicMongooseSchemaModule.controller('SchemaListController', [
        'SchemaService', '$rootScope',
        function (SchemaService, $rootScope) {
            let schemaListController = this;
            SchemaService.list()
                .success((schemas) => {
                    schemaListController.schemas = schemas;
                    if(schemas.length > 0) {
                        schemaListController.schemaView = mongooseSchemaGenerator.generate(schemas[0].columns);
                    }
                })
                .error((error) => {
                    schemaListController.errorMessage = error;
                });
            $rootScope.$on('schema:added', (event, newSchema) => {
                schemaListController.schemas.push(newSchema);
            });
        }]);
})(angular);