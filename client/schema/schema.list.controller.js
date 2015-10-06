/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaListController', [
        'SchemaService', '$rootScope', '$modal',
        function (SchemaService, $rootScope, $modal) {
            let schemaListController = this;
            SchemaService.list()
                .success((response) => {
                    schemaListController.schemas = response.tables;
                })
                .error((error) => {
                    schemaListController.errorMessage = error;
                });
            $rootScope.$on('schema:added', (event, newSchema) => {
                schemaListController.schemas.push(newSchema);
            });
            schemaListController.viewSchema = (index) => {
                $rootScope.$modalInstance = $modal.open({
                    templateUrl: 'schema/schema.view.html',
                    controller: 'SchemaViewController as schemaViewController',
                    resolve: {
                        schema_id: function () {
                            return schemaListController.schemas[index]._id;
                        }
                    }
                });
            };
            schemaListController.ok = () => {
                $rootScope.$modalInstance.close();
            };
            schemaListController.remove = (index)=> {
                let id = schemaListController.schemas[index]._id;
                SchemaService.remove(id)
                    .success((data) => {
                        schemaListController.schemas.splice(index, 1);
                    })
                    .error((error) => {

                    });
            };
        }
    ]);
})(angular);