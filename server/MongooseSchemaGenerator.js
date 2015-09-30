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
                column.required ? field.required = column.required == 'true' : '';
                column.trim ? field.trim = column.trim == 'true' : '';
                column.unique ? field.unique = column.unique == 'true' : '';
                column.letterCase == 'L' ? field.lowercase = true : '';
                column.letterCase == 'U' ? field.uppercase = true : '';
                column.index ? field.index = column.index == 'true' : '';
                column.default ? field.default = column.default : '';
            });
            return dynamicSchema;
        }
    }
    module.exports = new MongooseSchemaGenerator();
})(module);