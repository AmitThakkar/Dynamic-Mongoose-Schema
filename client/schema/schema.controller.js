/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.controller('SchemaController', [
        '$modal', '$rootScope',
        function ($modal, $rootScope) {
            let schemaController = this;
            schemaController.open = () => {
                $rootScope.$modalInstance = $modal.open({
                    templateUrl: 'schema/schema.add.html',
                    controller: 'SchemaAddController',
                    controllerAs: 'schemaAddController',
                    size: 'lg'
                });
            };
        }
    ]);
})(angular);