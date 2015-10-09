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
                        field.trim = column.trim == 'true';
                        column.letterCase == 'L' ? field.lowercase = true : '';
                        column.letterCase == 'U' ? field.uppercase = true : '';
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
                if (column.enum) {
                    field.enum = [];
                    column.enum.forEach(function (enumObject) {
                        field.enum.push(enumObject.text)
                    });
                }
                column.required ? field.required = column.required == 'true' : '';
                field.unique = column.unique == 'true';
                field.index = column.index == 'true';
                column.default ? field.default = column.default : '';
            });
            return dynamicSchema;
        }
    }
    module.exports = new MongooseSchemaGenerator();
})(module);