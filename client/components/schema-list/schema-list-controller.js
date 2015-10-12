/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaListController', [
        'SchemaService', '$rootScope', '$modal',
        function (SchemaService, $rootScope, $modal) {
            let schemaList = this;
            schemaList.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('Schema List', 'schema-list');
            }];
            schemaList.recordsPerPage = 5;
            schemaList.get = (pageNumber) => {
                schemaList.pageNumber = pageNumber;
                schemaList.alreadyShownRecordCount = ((pageNumber - 1) * schemaList.recordsPerPage) + 1;
                SchemaService.list(schemaList.recordsPerPage, pageNumber)
                    .success((response) => {
                        schemaList.schemas = response.tables;
                        schemaList.records = response.total;
                        schemaList.totalPages = Math.ceil(schemaList.records / schemaList.recordsPerPage);
                    })
                    .error((error) => {
                        schemaList.errorMessage = error;
                    });
            };
            schemaList.get(1);
            $rootScope.$on('schema:added', (event, newSchema) => {
                schemaList.schemas.push(newSchema);
            });
            schemaList.viewSchema = (index) => {
                $rootScope.$modalInstance = $modal.open({
                    templateUrl: 'schema/schema.view.html',
                    controller: 'SchemaViewController as schemaViewController',
                    resolve: {
                        schema_id: function () {
                            return schemaList.schemas[index]._id;
                        }
                    }
                });
            };
            schemaList.ok = () => {
                $rootScope.$modalInstance.close();
            };
            schemaList.remove = (index)=> {
                let id = schemaList.schemas[index]._id;
                SchemaService.remove(id)
                    .success((data) => {
                        schemaList.schemas.splice(index, 1);
                    })
                    .error((error) => {

                    });
            };
        }
    ]);
})(angular);