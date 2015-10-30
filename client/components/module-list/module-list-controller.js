/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ModuleListController', [
        'ModuleService',
        function (ModuleService) {
            let moduleList = this;
            moduleList.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('Module List', 'module-list');
            }];
            moduleList.recordsPerPage = 5;
            moduleList.get = (pageNumber) => {
                moduleList.pageNumber = pageNumber;
                moduleList.alreadyShownRecordCount = ((moduleList.pageNumber - 1) * moduleList.recordsPerPage) + 1;
                ModuleService.list(moduleList.recordsPerPage, moduleList.pageNumber)
                    .success((response) => {
                        moduleList.modules = response.modules;
                        moduleList.total = response.total;
                        moduleList.totalPages = Math.ceil(moduleList.total / moduleList.recordsPerPage);
                    })
                    .error((error) => {
                        moduleList.errorMessage = error;
                    });
            };
            moduleList.get(1);
            moduleList.viewApi = (index) => {
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