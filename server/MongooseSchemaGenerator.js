/**
 * Created by Amit Thakkar on 9/27/15.
 */
((module) => {
    "use strict";
    class MongooseSchemaGenerator {
        generate(columns) {
            let dynamicSchema = {};
            columns.forEach(function (column) {
                let field = dynamicSchema[column.name] = {};
                switch (column.type) {
                    case 'String' :
                        field.type = String;
                        break;
                    case 'Number' :
                        field.type = Number;
                        break;
                    case 'Array' :
                        field.type = Array;
                        break;
                    case 'Object' :
                        field.type = Object;
                        break;
                }
                field.required = column.required == 'true';
                column.letterCase == 'L' ? column.lowercase = true : '';
                column.letterCase == 'U' ? column.uppercase = true : '';
                field.trim = column.trim == 'true';
                field.unique = column.unique == 'true';
                field.index = column.index == 'true';
            });
            return dynamicSchema;
        }
    }
    module.exports = new MongooseSchemaGenerator();
})(module);