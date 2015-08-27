/**
 * @User.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: This file for making user model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },

        // The timestamp when the the user last logged in
        // (i.e. sent a username and password to the server)
        lastLoggedIn: {
            type: 'datetime',
            required: true,
            defaultsTo: function() {
                return new Date();
            }
        },

        // override default toJSON
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    /**
     *This function is used for encrypt the password.
     */
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    console.log(hash);
                    cb(null, user);
                }
            });
        });
    }
};