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
var randtoken = require("rand-token");

module.exports = {

    /**
     *This Function used for read information from csv file and store into databse and send mail to each applicant.
     *
     */
    readCsvFile: function(req, res) {
        
        req.file('file').upload(function(err, files) {
            var stream = fs.createReadStream(files[0].fd);
            var csvStream = csv()
                .on("data", function(data) {

                    var token=randtoken.generate(32);
                    console.log(data);
                    Invite.create({
                        firstName: data[0],
                        lastName: data[1],
                        email: data[2],
                        phoneNo: data[3],
                        token: token
                    }, function inviteCreated(err, newinvite) {
                        if (err) {

                            console.log("err: ", err);
                            console.log("err.invalidAttributes: ", err.invalidAttributes)

                            // Otherwise, send back something reasonable as our error response.
                            return res.negotiate(err);
                        }
                         // create reusable transporter object using SMTP transport
                        var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'nithitest1@gmail.com',
                            pass: 'test!@#$'
                        }
                    });
                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: 'Winperson <nithitest1@gmail.com>', 
                            to: data[2], 
                            subject: 'Winperson Invite',
                            text: 'Winperson', 
                            html: '<p>Hi'+' '+data[0]+',' + '</b>Nithi Manager has invited you to interview for the Job position at Ideas2It. Click the link below to accept the invitation http://localhost:1337/#/test/'+token + ' ' +'We are here to help you with every step along the way. Feel free to reach out to us at helpdesk@easyhire.me. We would love to hear from you! Thanks.</p>'
                        };

                         // send mail with defined transport object
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                            //res.ok();
                        });
                       
                    });
                })

            .on("end", function() {
                console.log("done");
            });

            stream.pipe(csvStream);
        });

         return res.send({
            result:true
         });
    },
};