/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    let apiObject = mongoose.Schema({
        name: {type: String, required: true, trim: true, lowercase: true},
        url: {type: String, required: true, trim: true, lowercase: true},
        method: {type: String, required: true, trim: true, uppercase: true, default: 'get'},
        projectName: {type: String, require: true, trim: true, lowercase: true, default: 'test'},
        userName: {type: String, require: true, trim: true, lowercase: true, default: 'amitthakkar'},
        createdAt: {type: Number, required: true, default: Date.now},
        lastUpdateAt: {type: Number, required: true, default: Date.now},
        isRemoved: {type: Boolean, default: false}
    });
    apiObject.static('findOneById', function (_id, callback) {
        this.findById(_id, {__v: 0, isRemoved: 0}).lean().exec(callback);
    });
    apiObject.static('findAll', function (options, callback) {
        if (!callback) {
            callback = options;
            options = {};
        }
        this.find({isRemoved: false}, {__v: 0, isRemoved: 0}, options).lean().exec(callback);
    });
    apiObject.static('countAll', function (callback) {
        this.count({isRemoved: false}, callback);
    });
    apiObject.static('findOneByIdAndUpdate', function (_id, updatedApi, callback) {
        this.findByIdAndUpdate(_id, {$set: updatedApi}).exec(callback);
    });
    // TODO not update date.
    apiObject.pre('findOneAndUpdate', function () {
        this.lastUpdateAt = Date.now();
    });
    apiObject.index({userName: 1, projectName: 1, url: 1, method: 1}, {unique: true});
    apiObject.index({userName: 1, projectName: 1, name: 1}, {unique: true});
    apiObject.index({isRemoved: 1});
    module.exports = mongoose.model('Api', apiObject);
})(module, require);