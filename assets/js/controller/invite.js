/**
 * @Invite.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 //directives for file uploading 
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
  //services for http file uploading
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
    // controller for the send request to server side
    .controller('InviteController', ['$scope', '$http','$location', 'fileUpload', function($scope, $http,$location, fileUpload) {
        /**
         *This function is used for uploading a csv file.
         */
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            if (($scope.myFile.name.substring($scope.myFile.name.lastIndexOf('.') + 1) != 'csv')) {
               $scope.errorMsg='Soryy!!!! please upload valid csv file';
               if($scope.errorMsg){
                  alert($scope.errorMsg);
                  return ;
               }    
              }
            console.dir(file);
            var uploadUrl = "/invite";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };

    }]);