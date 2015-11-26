/**
 * Created by Amit Thakkar on 10/25/15.
 */
(() => {
    "use strict";
    var GitHubApi = require("github");
    var github = new GitHubApi({
        version: "3.0.0",
        // optional
        //debug: true,
        protocol: "https",
        host: "api.github.com",
        timeout: 5000,
        headers: {
            "user-agent": "API Server"
        }
    });
    github.user.getFollowingFromUser({
        // optional:
        // headers: {
        //     "cookie": "blahblah"
        // },
        user: "amitthakkar"
    }, function (err, res) {
        console.log(res.length);
    });
    github.authenticate({
        type: "oauth",
        token: 'e5e55e1e2ab75f729434884313eb342be05c173a'
    });
    github.user.update({
        location: "San Ramon"
    }, function(err) {
        console.log(arguments);
    });
})();