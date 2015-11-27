/**
 * Created by Amit Thakkar on 9/27/15.
 */
((module) => {
    "use strict";
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    class MongooseSchemaGenerator {
        generate(table) {
            let schemaName = table.databaseName + table.tableName;
            if(mongoose.models[schemaName]) {
                return mongoose.models[schemaName];
            } else {
                let dynamicSchema = {};
                table.columns.forEach(function (column) {
                    let field = dynamicSchema[column.name] = {};
                    switch (column.type) {
                        case 'String' :
                            field.type = String;
                            field.trim = column.trim == true;
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
                    field.required = column.required == true;
                    field.unique = column.unique == true;
                    field.index = column.index == true;
                    column.default ? field.default = column.default : '';
                });
                let DynamicSchema = mongoose.Schema(dynamicSchema);
                DynamicSchema.static('findOneById', function (_id, callback) {
                    this.findById(_id, {__v: 0}).lean().exec(callback);
                });
                DynamicSchema.static('removeById', function (_id, callback) {
                    this.remove({_id: ObjectId(_id)}, callback);
                });
                DynamicSchema.static('findAll', function (projection, options, callback) {
                    if(!callback) {
                        if(!options) {
                            callback = projection;
                            options = {};
                        } else {
                            callback = options;
                            options = projection;
                        }
                        projection = {__v: 0};
                    }
                    this.find({}, projection, options).lean().exec(callback);
                });
                DynamicSchema.static('countAll', function (callback) {
                    this.count({}, callback);
                });
                return mongoose.model(schemaName, DynamicSchema);
            }
        }
    }
    module.exports = new MongooseSchemaGenerator();
})(module);