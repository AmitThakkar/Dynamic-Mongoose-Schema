/**
 * Created by Amit Thakkar on 10/16/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ModuleEditController', [
        'ModuleService', '$routeParams',
        function (ModuleService, $routeParams) {
            let moduleEdit = this;
            moduleEdit.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('Module Edit', 'module-edit');
            }];
            ModuleService.get($routeParams._id)
                .success((updatedModule) => {
                    moduleEdit.updatedModule = updatedModule;
                })
                .error((error)=> {
                    // TODO handler updatedModule handler before showing
                });
            moduleEdit.reset = (isManualReset) => {
                moduleEdit.errorMessage = '';
                if (isManualReset) {
                    moduleEdit.successMessage = '';
                }
            };
            moduleEdit.udpate = () => {
                moduleEdit.errorMessage = '';
                moduleEdit.successMessage = '';
                ModuleService.update($routeParams._id, {
                    name: moduleEdit.updatedModule.name,
                    handler: moduleEdit.updatedModule.handler
                })
                    .success(() => {
                        moduleEdit.successMessage = "Your Module has been successfully saved.";
                    })
                    .error((error) => {
                        moduleEdit.errorMessage = error;
                    });
            };
        }
    ]);
})(angular);