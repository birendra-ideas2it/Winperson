/**
 * @job.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
angular.module('winpersonApp').controller('JobController', ['$scope', '$http', '$location', 'toastr', function($scope, $http, $location, toastr) {
    
    /**
     *This function is used for send request submitjob .
     */

    $scope.submitJobForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.jobForm.loading = true;

        // Submit request to Sails.
        $http.post('/job', {
                title: $scope.jobForm.title,
                description: $scope.jobForm.description,
                experience: $scope.jobForm.experience,
                salary: $scope.jobForm.salary
            })
            .then(function onSuccess(sailsResponse) {
                console.log('-----hi', sailsResponse.data.id);
                var id = sailsResponse.data.id;
                //window.location = '#/question';
                $location.path('/question/' + id);
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
                $scope.jobForm.loading = false;
            })
    };
}]);