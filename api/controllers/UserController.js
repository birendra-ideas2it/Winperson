/**
 * UserController
 * @Author       : Birendra Kumar
 * @Dated        : 19-08-2015
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {




    /**
     * Check the provided email address and password, and if they
     * match a real user in the database, sign in to Activity Overlord.
     */
    signin: function(req, res) {


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
                console.log('-------------proper response---------');
                req.session.me = user.id;
                return res.ok();
                /*({

                                   message: info.message,
                                   user: user
                               });*/
            });

        })(req, res);

    },

    /**
     * Sign up for a user account.
     */
    signup: function(req, res) {
        // Create a User with the params sent from
        // the sign-up form --> signup.ejs
        User.create({
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
            lastLoggedIn: new Date()
        }, function userCreated(err, newUser) {
            if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                    return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }

            // Log user in
            req.session.me = newUser.id;

            // Send back the id of the new user
            return res.json({
                id: newUser.id
            });
        });
    },


    /**
     * Log out of Winperson.
     * (wipes `me` from the sesion)
     */
    logout: function(req, res) {

        // Look up the user record from the database which is
        // referenced by the id in the user session (req.session.me)
        User.findOne(req.session.me, function foundUser(err, user) {
            if (err) return res.negotiate(err);

            // If session refers to a user who no longer exists, still allow logout.
            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.view();
            }

            // Wipe out the session (log out)
            req.session.me = null;

            // Either send a 200 OK or redirect to the home page
            return res.ok();

        });
    },



};

