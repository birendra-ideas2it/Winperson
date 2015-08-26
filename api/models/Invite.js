/**
 * @Invite.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for making invite model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {

        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true

        },
        email: {
            type: 'email',
            required: true
                // unique: true
        },

        phoneNo: {
            type: 'string',
            required: true,
            defaultsTo: '111-222-3333'
        },
        token: {
            type: 'string',
            required: true
        }
    }
};