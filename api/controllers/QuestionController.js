/**
 * @QuestionController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    /**
     *This function is used for creating questions.
     */



    createQuestion: function(req, res) {
        console.log('hiiiii--Create-Question-----QuestionController');
        var questionstring = JSON.stringify(req.body);
        console.log(questionstring);
        var jsonObject = JSON.parse(questionstring);
        for (var i = 0; i < jsonObject.question.length; i++) {


            Question.create({
                question: jsonObject.question[i].question,
                jobid: req.body.jobid
            }, function userCreated(err, newQuestion) {


                if (err) {

                    console.log("err: ", err);
                    console.log("err.invalidAttributes: ", err.invalidAttributes)
                        // Otherwise, send back something reasonable as our error response.
                    return res.negotiate(err);
                }
                // Send back the  response

            });
        }
        Job.update({
            id: req.body.jobid
        }, {
            timePerQues: req.body.timePerQues,
            quesPerTest: req.body.quesPerTest
        }).exec(function(e1, r1) {
            return res.ok();
        });
    }
};