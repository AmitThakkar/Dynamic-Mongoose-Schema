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
        columns: {type: Array}
    });
    schemaObject.static('findAll', function (callback) {
        this.find({isRemoved: false}, {_id: 0, __v: 0, isRemoved: 0}).lean().exec(callback);
    });
    schemaObject.static('removeOneById', function (_id, callback) {
        this.update({_id: ObjectId(_id)}, {$set: {isRemoved: true}}, {multi: false, upsert: false}, callback);
    });
    schemaObject.index({databaseName: 1, tableName: 1}, {unique: true});
    schemaObject.index({isRemoved: 1});
    module.exports = mongoose.model('Schema', schemaObject);
})(module, require);