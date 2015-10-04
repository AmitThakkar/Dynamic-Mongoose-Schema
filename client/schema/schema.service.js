/**
 * Created by Amit Thakkar on 10/4/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.service('SchemaService', ['$http', function ($http) {
        let schemaService = this;
        const URL = 'schema/';
        schemaService.save = (newSchema) => {
            return $http.post(URL, newSchema)
        };
        schemaService.list = () => {
            return $http.get(URL)
        };
        schemaService.get = (id) => {
            return $http.get(URL + id)
        };
        schemaService.remove = (id) => {
            return $http.delete(URL + id)
        };
    }]);
})(angular);