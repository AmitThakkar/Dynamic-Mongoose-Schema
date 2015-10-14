/**
 * Created by Amit Thakkar on 9/26/15.
 */
((ng) => {
    'use strict';
    let dynamicMongooseSchema = ng.module('dynamicMongooseSchema', ['ui.bootstrap', 'ngTagsInput', 'ngNewRouter']);
    dynamicMongooseSchema.controller('MasterController', ['$router', '$rootScope', function ($router, $scope) {
        var master = this;
        $router.config([
            {
                path: '/',
                redirectTo: '/schema-list'
            },
            {
                path: '/schema-list',
                component: 'schemaList'
            },
            {
                path: '/schema-add',
                component: 'schemaAdd'
            },
            {
                path: '/api-list',
                component: 'apiList'
            }
        ]);
        $scope.setTitleAndPageProperty = function(title, page) {
            master.title = title;
            master.page = page;
        };
    }])
})(angular);