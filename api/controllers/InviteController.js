/**
 * @InviteController
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var parse = require('csv-parse');
var fs = require("fs");
var csv = require('fast-csv');
var randomstring = require("randomstring");
module.exports = {

    /**
     *This Function used for read information from csv file and store into databse.
     *
     */
    readCsvFile: function(req, res) {
        req.file('file').upload(function(err, files) {
            var stream = fs.createReadStream(files[0].fd);
            var csvStream = csv()
                .on("data", function(data) {
                    console.log(data);
                    Invite.create({
                        firstName: data[0],
                        lastName: data[1],
                        email: data[2],
                        phoneNo: data[3],
                        token: randomstring.generate()
                    }, function inviteCreated(err, newinvite) {
                        if (err) {

                            console.log("err: ", err);
                            console.log("err.invalidAttributes: ", err.invalidAttributes)



                            // Otherwise, send back something reasonable as our error response.
                            return res.negotiate(err);
                        }

                        return res.ok();
                    });
                })

            .on("end", function() {
                console.log("done");
            });

            stream.pipe(csvStream);
        });
    },

    /**
     *This Function used for send email to applicant.
     *
     */

    Sendemail: function(req, res) {
        var params = req.params.all();
        console.log(params);
        if (!params.email) {
            res.send(500);
        }

        var msg = [];
        msg = 'Someone Has Contact You From the Website!\n';
        msg += '------------------------------------------\n';

        if (params.email) {
            msg += 'Email: ' + params.email + '\n';
        }

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nithitest1@gmail.com',
                pass: 'test!@#$'
            }
        });
        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'TEST Foo ✔ <nithitest1@gmail.com>', 
            to: params.email, 
            subject: 'Hello ✔',
            text: 'Hello world ✔', 
            html: '<b>Hello world ✔</b>' 
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.ok();
        });
    }


};