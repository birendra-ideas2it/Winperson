/**
 * @Authenticated.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing authentications.
 */
/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(403, {
            message: 'Not Authorized'
        });
    }
};