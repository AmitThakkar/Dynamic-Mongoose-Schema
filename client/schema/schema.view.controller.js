/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    class MongooseSchemaGenerator {
        generate(columns) {
            let dynamicSchema = {_id: {type: 'ObjectId', unique: true, index: true}};
            columns.forEach(function (column) {
                let field = dynamicSchema[column.name] = {};
                column.type ? field.type = column.type : '';
                column.required ? field.required = column.required == 'true' : '';
                column.trim ? field.trim = column.trim == 'true' : '';
                column.unique ? field.unique = column.unique == 'true' : '';
                column.letterCase == 'L' ? field.lowercase = true : '';
                column.letterCase == 'U' ? field.uppercase = true : '';
                column.index ? field.index = column.index == 'true' : '';
                column.default ? field.default = column.default : '';
            });
            return dynamicSchema;
        }
    }
    let mongooseSchemaGenerator = new MongooseSchemaGenerator();
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaViewController', [
        'SchemaService', 'schema_id', '$rootScope',
        function (SchemaService, schema_id, $rootScope) {
            let schemaViewController = this;
            SchemaService.get(schema_id)
                .success((data) => {
                    schemaViewController.schemaView = JSON.stringify(mongooseSchemaGenerator.generate(data.columns), undefined, 4);
                })
                .error((error) => {

                });
            schemaViewController.ok = () => {
                $rootScope.$modalInstance.close();
            };
        }
    ]);
})(angular);