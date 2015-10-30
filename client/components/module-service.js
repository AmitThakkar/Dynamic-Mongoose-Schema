/**
 * Created by Amit Thakkar on 10/14/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.service('ModuleService', ['$http', function ($http) {
        let moduleService = this;
        const URL = 'module/';
        moduleService.save = (newApi) => {
            return $http.post(URL, newApi)
        };
        moduleService.update = (_id, updatedApi) => {
            return $http.put(URL + _id, updatedApi)
        };
        moduleService.list = (max, pageNumber) => {
            return $http.get(URL + max + '/' + pageNumber)
        };
        moduleService.get = (_id) => {
            return $http.get(URL + _id)
        };
        moduleService.remove = (_id) => {
            return $http.delete(URL + _id)
        };
    }]);
})(angular);