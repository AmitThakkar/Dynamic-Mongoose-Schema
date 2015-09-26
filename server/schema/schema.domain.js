/**
 * Created by Amit Thakkar on 9/25/15.
 */
((module, require) => {
    "use strict";
    const mongoose = require('mongoose');

    let Schema = mongoose.model('Schema',
        {
            collectionName: {type: String, required: true, trim: true, unique: true, lowercase: true, index: true},
            collectionSchema: {type: Object}
        }
    );

    module.exports = Schema;
})(module, require);