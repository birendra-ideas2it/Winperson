/**
 * @JobController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


    /**
     *This function is used for creating new job.
     */

    create: function(req, res) {

        console.log('hiiiiii--i am in JobController');
        Job.create({
            title: req.param('title'),
            description: req.param('description'),
            experience: req.param('experience'),
            salary: req.param('salary')
        }, function jobCreated(err, newjob) {
            if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)
                    // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
            }

            // Send back the id of the new user
            return res.json({
                id: newjob.id
            });
        });
    }

};