/**
 * Created by Amit Thakkar on 10/13/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    let dynamicRouteObject = mongoose.Schema({
        url: {type: String, required: true, trim: true, lowercase: true},
        method: {type: String, required: true, trim: true, lowercase: true},
        endpoints: {type: Array, require: true},
        isRemoved: {type: Boolean, default: false}
    });
    dynamicRouteObject.static('findOneByURLAndMethod', function (url, method, callback) {
        this.findOne({url: url, method: method}, {__v: 0, isRemoved: 0}).lean().exec(callback);
    });
    dynamicRouteObject.index({url: 1, method: 1}, {unique: true});
    dynamicRouteObject.index({isRemoved: 1});
    module.exports = mongoose.model('DynamicRoute', dynamicRouteObject);
})(module, require);