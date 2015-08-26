/**
 * @Invite.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
angular.module('winpersonApp').directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }
    }])
    .service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(data) {
                    console.log('upload data', data);
                    if (data.result) {

                        //alert('file uploaded. See .tmp/uploads folder.');
                        window.location = '#/job';
                    }
                })
                .error(function(err) {
                    // alert('there was an error uploading the file.');
                    console.log(err);
                });
        }
    }])
    .controller('InviteController', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {
        /**
         *This function is used for uploading a csv file.
         */
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            console.log('file is ', file);
            console.dir(file);
            var uploadUrl = "/invite";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        }

        /**
         *This function is used for send email to applicant.
         */


        $scope.sendEmailto = function() {

            // Set the loading state (i.e. show loading spinner)
            $scope.emailForm.loading = true;
            console.log('------Client invite ctrl', $scope.emailForm.email);
            // Submit request to Sails.
            $http.post('/sendEmail', {
                    email: $scope.emailForm.email
                })
                .then(function onSuccess(sailsResponse) {
                    window.location = '#/job';
                })
                .catch(function onError(sailsResponse) {

                    // Handle known error type(s).
                    // If using sails-disk adpater -- Handle Duplicate Key
                    var emailAddressAlreadyInUse = sailsResponse.status == 409;

                    if (emailAddressAlreadyInUse) {
                        toastr.error('That email address has already been taken, please try again.', 'Error');
                        return;
                    }

                })
                .finally(function eitherWay() {
                    $scope.emailForm.loading = false;
                })
        };
    }]);