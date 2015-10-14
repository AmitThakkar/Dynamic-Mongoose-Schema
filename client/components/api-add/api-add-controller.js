/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ApiAddController', [
        'ApiService',
        function (ApiService) {
            let apiAdd = this;
            apiAdd.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('API Add', 'api-add');
            }];
            apiAdd.addNewHandler = () => {
                apiAdd.newApi.handlers.push('//New Handler Code should go here');
            };
            apiAdd.reset = (isManualReset) => {
                apiAdd.errorMessage = '';
                if (isManualReset) {
                    apiAdd.successMessage = '';
                }
                apiAdd.newApi = {
                    handlers: ['//New Handler Code should go here']
                };
            };
            apiAdd.save = () => {
                apiAdd.errorMessage = '';
                apiAdd.successMessage = '';
                if (!apiAdd.newApi.name) {
                    apiAdd.errorMessage = 'Please provide Name for API';
                    return;
                }
                if (!apiAdd.newApi.url) {
                    apiAdd.errorMessage = 'Please provide URL for API';
                    return;
                }
                if (!apiAdd.newApi.method) {
                    apiAdd.errorMessage = 'Please provide Method for API';
                    return;
                }
                if (apiAdd.newApi.handlers.length < 1) {
                    apiAdd.errorMessage = 'Please provide at-least one Handler for API';
                    return;
                }
                ApiService.save(apiAdd.newApi)
                    .success((newApi) => {
                        apiAdd.successMessage = "Your Api has been successfully saved.";
                        apiAdd.reset(false);
                    })
                    .error((error) => {
                        apiAdd.errorMessage = error;
                    });
            };
            if (!apiAdd.newApi) {
                apiAdd.reset(false);
            }
        }
    ]);
})(angular);