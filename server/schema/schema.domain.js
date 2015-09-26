/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    let schemaObject = mongoose.Schema({
        databaseName: {type: String, required: true, trim: true, lowercase: true},
        tableName: {type: String, required: true, trim: true, lowercase: true},
        columns: {type: Array}
    });
    schemaObject.index({databaseName: 1, tableName: 1}, {unique: true});
    module.exports = mongoose.model('Schema', schemaObject);
})(module, require);