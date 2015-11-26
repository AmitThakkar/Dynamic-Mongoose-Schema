/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('ModuleAddController', [
        'ModuleService',
        function (ModuleService) {
            let moduleAdd = this;
            moduleAdd.activate = ['$scope', function ($scope) {
                $scope.setTitleAndPageProperty('Module Add', 'module-add');
            }];
            moduleAdd.reset = (isManualReset) => {
                moduleAdd.errorMessage = '';
                if (isManualReset) {
                    moduleAdd.successMessage = '';
                }
            };
            moduleAdd.save = () => {
                moduleAdd.errorMessage = '';
                moduleAdd.successMessage = '';
                if (!moduleAdd.newModule.name) {
                    moduleAdd.errorMessage = 'Please provide Name for Module';
                    return;
                }
                moduleAdd.newModule.projectName = 'test';
                moduleAdd.newModule.userName = 'amitthakkar';
                ModuleService.save(moduleAdd.newModule)
                    .success(() => {
                        moduleAdd.successMessage = "Your Module has been successfully saved.";
                        moduleAdd.reset(false);
                    })
                    .error((error) => {
                        moduleAdd.errorMessage = error;
                    });
            };
            if (!moduleAdd.newModule) {
                moduleAdd.reset(false);
            }
        }
    ]);
})(angular);