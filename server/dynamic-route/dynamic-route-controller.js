/**
 * Created by Amit Thakkar on 10/13/15.
 */
((require, module)=> {
    "use strict";
    let exports = module.exports;
    exports.handler = (request, response) => {
        response.status(200).json("Test");
    };
})(require, module);