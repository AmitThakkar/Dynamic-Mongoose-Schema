/**
 * Created by Amit Thakkar on 10/14/15.
 */
((ng) => {
    "use strict";
    class MongooseSchemaGenerator {
        generate(columns) {
            let dynamicSchema = {_id: {type: 'ObjectId', unique: true, index: true}};
            ng.forEach(columns, function (column) {
                let field = dynamicSchema[column.name] = {};
                if (column.type) {
                    field.type = column.type;
                    switch (column.type) {
                        case 'String' :
                            field.trim = column.trim == true;
                            column.letterCase == 'L' ? field.lowercase = true : '';
                            column.letterCase == 'U' ? field.uppercase = true : '';
                            break;
                        case 'Number' :
                            break;
                        case 'Array' :
                            break;
                        case 'Object' :
                            break;
                    }
                }
                if (column.enum) {
                    field.enum = [];
                    ng.forEach(column.enum, function (enumObject) {
                        field.enum.push(enumObject.text)
                    });
                }
                field.required = column.required == true;
                field.unique = column.unique == true;
                field.index = column.index == true;
                column.default ? field.default = column.default : '';
            });
            return dynamicSchema;
        }
    }
    window.MongooseSchemaGenerator = MongooseSchemaGenerator;
})(angular);