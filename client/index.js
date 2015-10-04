/**
 * Created by Amit Thakkar on 9/26/15.
 */
((ng) => {
    'use strict';
    let dynamicMongooseSchemaModule = ng.module('dynamicMongooseSchema', ['ui.bootstrap']);
    dynamicMongooseSchemaModule.directive('jsonView', [() => {
        return {
            restrict: 'E',
            scope: {
                json: '@'
            },
            link: ($scope, element) => {
                let parseJsonToHTML = () => {
                    var jsonView = $scope.json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                            var cls = 'number';
                            if (/^"/.test(match)) {
                                if (/:$/.test(match)) {
                                    cls = 'key';
                                } else {
                                    cls = 'string';
                                }
                            } else if (/true|false/.test(match)) {
                                cls = 'boolean';
                            } else if (/null/.test(match)) {
                                cls = 'null';
                            }
                            return '<span class="' + cls + '">' + match + '</span>';
                        });
                    element.html('<pre>' + jsonView + '</pre>');
                };
                $scope.$watch('json', (newValue, oldValue) => {
                    if (newValue != oldValue) {
                        parseJsonToHTML();
                    }
                });
                parseJsonToHTML();
            }
        }
    }]);
})(angular);