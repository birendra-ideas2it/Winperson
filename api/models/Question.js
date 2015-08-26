/**
 * @Question.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {
        question: {
            type: 'string',
            required: true
        },
        jobid: {
            type: 'string',
            required: true
        }
    }
};