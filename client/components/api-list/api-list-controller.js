/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ApiListController', [
        'ApiService', '$rootScope', '$modal',
        function (ApiService, $rootScope, $modal) {
            let apiList = this;
            apiList.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('API List', 'api-list');
            }];
            apiList.recordsPerPage = 5;
            apiList.get = (pageNumber) => {
                apiList.pageNumber = pageNumber;
                apiList.alreadyShownRecordCount = ((apiList.pageNumber - 1) * apiList.recordsPerPage) + 1;
                ApiService.list(apiList.recordsPerPage, apiList.pageNumber)
                    .success((response) => {
                        apiList.apis = response.apis;
                        apiList.total = response.total;
                        apiList.totalPages = Math.ceil(apiList.total / apiList.recordsPerPage);
                    })
                    .error((error) => {
                        apiList.errorMessage = error;
                    });
            };
            apiList.get(1);
            apiList.viewApi = (index) => {
                /*$rootScope.$modalInstance = $modal.open({
                    templateUrl: 'schema/schema.view.html',
                    controller: 'SchemaViewController as schemaViewController',
                    resolve: {
                        schema_id: function () {
                            return apiList.schemas[index]._id;
                        }
                    }
                });*/
            };
            /*apiList.ok = () => {
                $rootScope.$modalInstance.close();
            };
            apiList.remove = (index)=> {
                let id = apiList.schemas[index]._id;
                ApiService.remove(id)
                    .success((data) => {
                        apiList.schemas.splice(index, 1);
                    })
                    .error((error) => {

                    });
            };*/
        }
    ]);
})(angular);