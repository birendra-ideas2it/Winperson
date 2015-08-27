/**
 * @InviteController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing passport initialize.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = {
    http: {
        customMiddleware: function(app) {
            console.log('Express middleware for passport');
            app.use( passport.initialize() );
            app.use( passport.session() );
        }
    }
};