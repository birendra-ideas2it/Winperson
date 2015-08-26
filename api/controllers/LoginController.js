/**
 * @LoginController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing Login
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
module.exports = {

    /**
     *This function is used for initiating file.
     */

    index: function(req, res) {
        return res.view({
            description: 'This is a SailsJS / AngularJS Application'
        });
    },

    /**
     *This function is used for login.
     */
    signin: function(req, res) {

        console.log('--------Signin----------');

        // Try to look up user using the provided email address
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                console.log('-------------Error response---------');
                return res.notFound();
                /*res.send({
                                   message: info.message,
                                   user: user
                               });*/
            }
            req.logIn(user, function(err) {
                if (err) res.notFound(); //send(err);
                console.log('-------------LogIn response---------');
                req.session.me = user.id;
                return res.ok();
            });

        })(req, res);


    }
};