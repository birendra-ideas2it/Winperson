/**
 * @Job.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {

        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true

        },
        experience: {
            type: 'string',
            required: true
        },
        salary: {
            type: 'string',
            required: true
        },

        timePerQues: {
            type: 'string'
        },
        quesPerTest: {
            type: 'string'
        }


    }
};