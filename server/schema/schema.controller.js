/**
 * Created by Amit Thakkar on 9/25/15.
 */
((require, module)=> {
    "use strict";
    let Schema = require('./schema.domain');
    module.exports.save = () => {
        new Schema({
            collectionName: 'User',
            collectionSchema: {
                name: {type: "String", required: true, uppercase: true, trim: true, index: true, select: false},
                email: {type: "String", required: true, lowercase: true, trim: true, match: "", unique: true},
                password: {type: "", required: false, default: "defaultPassword"},
                age: {type: "Number", min: 10, max: 20, required: false},
                dob: {type: "Number"},
                sex: {type: "String", enum: ["M", "F"]}
            }
        }).save((error) => {
                if (error) {
                    console.log('User Schema saved Error', error);
                } else {
                    console.log('User Schema saved');
                }
            });
    }
})(require, module);