/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    let apiObject = mongoose.Schema({
        name: {type: String, required: true, trim: true, lowercase: true, unique: true},
        url: {type: String, required: true, trim: true, lowercase: true},
        method: {type: String, required: true, trim: true, lowercase: true, default: 'get'},
        handlers: {type: Array, required: true},
        isRemoved: {type: Boolean, default: false}
    });
    apiObject.static('findOneByURLAndMethod', function (url, method, callback) {
        this.findOne({url: url, method: method}, {__v: 0, isRemoved: 0}).lean().exec(callback);
    });
    apiObject.index({url: 1, method: 1}, {unique: true});
    apiObject.index({isRemoved: 1});
    module.exports = mongoose.model('Api', apiObject);
})(module, require);