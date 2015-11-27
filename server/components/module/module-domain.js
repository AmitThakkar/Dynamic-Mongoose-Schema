/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    let moduleObject = mongoose.Schema({
        name: {type: String, required: true, trim: true, lowercase: true},
        projectName: {type: String, require: true, trim: true, lowercase: true, default: 'test'},
        userName: {type: String, require: true, trim: true, lowercase: true, default: 'amitthakkar'},
        createdAt: {type: Number, required: true, default: Date.now},
        lastUpdateAt: {type: Number, required: true, default: Date.now},
        isRemoved: {type: Boolean, default: false}
    });
    moduleObject.static('findOneById', function (_id, callback) {
        this.findById(_id, {__v: 0, isRemoved: 0}).lean().exec(callback);
    });
    moduleObject.static('findAll', function (projection, options, callback) {
        if(!callback) {
            if(!options) {
                callback = projection;
                options = {};
            } else {
                callback = options;
                options = projection;
            }
            projection = {__v: 0, isRemoved: 0};
        }
        this.find({isRemoved: false}, projection, options).lean().exec(callback);
    });
    moduleObject.static('countAll', function (callback) {
        this.count({isRemoved: false}, callback);
    });
    moduleObject.static('findOneByIdAndUpdate', function (_id, updatedModule, callback) {
        this.findByIdAndUpdate(_id, {$set: updatedModule}).exec(callback);
    });
    moduleObject.static('removeById', function (_id, callback) {
        this.remove({_id: ObjectId(_id)}, callback);
    });
    // TODO not update date.
    moduleObject.pre('findOneAndUpdate', function () {
        this.lastUpdateAt = Date.now();
    });
    moduleObject.index({userName: 1, projectName: 1, name: 1}, {unique: true});
    moduleObject.index({isRemoved: 1});
    module.exports = mongoose.model('Module', moduleObject);
})(module, require);