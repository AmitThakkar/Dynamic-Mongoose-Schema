/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ApiViewController', [
        'ApiService', '$routeParams',
        function (ApiService, $routeParams) {
            let apiView = this;
            apiView.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('API View', 'api-view');
            }];
            ApiService.get($routeParams._id)
                .success((api) => {
                    apiView.api = api;
                })
                .error((error)=> {
                    apiView.errorMessage = error;
                });
            apiView.addNewHandler = () => {
                apiView.api.handlers.push('//New Handler Code should go here');
            };
            apiView.reset = (isManualReset) => {
                apiView.errorMessage = '';
                if (isManualReset) {
                    apiView.successMessage = '';
                }
                apiView.api = {
                    handlers: ['//New Handler Code should go here']
                };
            };
            apiView.update = () => {
                apiView.errorMessage = '';
                apiView.successMessage = '';
                if (apiView.api.handlers.length < 1) {
                    apiView.errorMessage = 'Please provide at-least one Handler for API';
                    return;
                }
                ApiService.save(apiView.api)
                    .success((api) => {
                        apiView.successMessage = "Your Api has been successfully saved.";
                        apiView.reset(false);
                    })
                    .error((error) => {
                        apiView.errorMessage = error;
                    });
            };
            if (!apiView.api) {
                apiView.reset(false);
            }
        }
    ]);
})(angular);