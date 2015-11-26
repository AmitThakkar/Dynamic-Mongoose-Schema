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
                    // TODO handler api handler before showing
                });
        }
    ]);
})(angular);