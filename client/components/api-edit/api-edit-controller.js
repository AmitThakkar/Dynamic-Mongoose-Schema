/**
 * Created by Amit Thakkar on 10/16/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ApiEditController', [
        'ApiService', '$routeParams',
        function (ApiService, $routeParams) {
            let apiEdit = this;
            apiEdit.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('API Edit', 'api-edit');
            }];
            apiEdit.methods = [
                'GET',
                'POST',
                'PUT',
                'DELETE'
            ];
            ApiService.get($routeParams._id)
                .success((updatedApi) => {
                    apiEdit.updatedApi = updatedApi;
                })
                .error((error)=> {
                    // TODO handler updatedApi handler before showing
                });
            apiEdit.addNewHandler = () => {
                apiEdit.updatedApi.handlers.push('//New Handler Code should go here');
            };
            apiEdit.reset = (isManualReset) => {
                apiEdit.errorMessage = '';
                if (isManualReset) {
                    apiEdit.successMessage = '';
                }
                apiEdit.updatedApi = {
                    handlers: ['//New Handler Code should go here']
                };
            };
            apiEdit.udpate = () => {
                apiEdit.errorMessage = '';
                apiEdit.successMessage = '';
                if (apiEdit.updatedApi.handlers.length < 1) {
                    apiEdit.errorMessage = 'Please provide at-least one Handler for API';
                    return;
                }
                ApiService.update($routeParams._id, {
                    handlers: apiEdit.updatedApi.handlers
                })
                    .success((updatedApi) => {
                        apiEdit.successMessage = "Your Api has been successfully saved.";
                    })
                    .error((error) => {
                        apiEdit.errorMessage = error;
                    });
            };
        }
    ]);
})(angular);