/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');
    let Schema = mongoose.model('Schema', {
        databaseName: {type: String, required: true, trim: true, lowercase: true},
        tableName: {type: String, required: true, trim: true, lowercase: true},
        columns: {type: Array}
    });
    module.exports = Schema;
})(module, require);