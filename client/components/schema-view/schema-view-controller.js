/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
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