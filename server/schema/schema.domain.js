/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    let schemaObject = mongoose.Schema({
        databaseName: {type: String, required: true, trim: true, lowercase: true},
        tableName: {type: String, required: true, trim: true, lowercase: true},
        isRemoved: {type: Boolean, default: false},
        columns: {type: Array}
    });
    schemaObject.static('findOneById', function (_id, callback) {
        this.findOne({_id: _id}, {__v: 0, isRemoved: 0}).lean().exec(callback);
    });
    schemaObject.static('findAll', function (options, callback) {
        this.find({isRemoved: false}, {__v: 0, isRemoved: 0, columns: 0}, options).lean().exec(callback);
    });
    schemaObject.static('countAll', function (callback) {
        this.count({isRemoved: false}, callback);
    });
    schemaObject.static('softRemove', function (_id, callback) {
        this.update({_id: ObjectId(_id)}, {$set: {isRemoved: true}}, {multi: false, upsert: false}, callback);
    });
    schemaObject.index({databaseName: 1, tableName: 1}, {unique: true});
    schemaObject.index({isRemoved: 1});
    module.exports = mongoose.model('Schema', schemaObject);
})(module, require);