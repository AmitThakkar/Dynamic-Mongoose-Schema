/**
 * Created by Amit Thakkar on 10/14/15.
 */
((ng) => {
    "use strict";
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema');
    dynamicMongooseSchemaModule.service('ApiService', ['$http', function ($http) {
        let apiService = this;
        const URL = 'api/';
        apiService.save = (newApi) => {
            return $http.post(URL, newApi)
        };
        apiService.update = (_id, updatedApi) => {
            return $http.put(URL + _id, updatedApi)
        };
        apiService.list = (max, pageNumber) => {
            return $http.get(URL + max + '/' + pageNumber)
        };
        apiService.get = (_id) => {
            return $http.get(URL + _id)
        };
        apiService.remove = (_id) => {
            return $http.delete(URL + _id)
        };
    }]);
})(angular);