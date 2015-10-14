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
        apiService.list = (max, pageNumber) => {
            return $http.get(URL + max + '/' + pageNumber)
        };
        apiService.get = (id) => {
            return $http.get(URL + id)
        };
        apiService.remove = (id) => {
            return $http.delete(URL + id)
        };
    }]);
})(angular);