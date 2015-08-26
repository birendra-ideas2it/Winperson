/**
 * @SignupController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing Signups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var SignupController = {
    /**
     *This function is used for initiating file.
     */
    index: function(req, res) {
        return res.view({
            description: 'This is a SailsJS / AngularJS Application'
        });
    },
    /**
     *This function is used for creating new user.
     */
    signup: function(req, res) {
        User
            .create(_.omit(req.allParams(), 'id'))
            .then(function(user) {
                return res.ok({
                    user: user
                });
            })
            .then(res.created)
            .catch(res.serverError);
    }
};
module.exports = SignupController;