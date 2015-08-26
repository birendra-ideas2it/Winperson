/**
 * @signup.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
angular.module('winpersonApp').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
    // set-up loading state

    /**
     *This function is used for send request submitSignup .
     */
    $scope.submitSignupForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit request to Sails.
        $http.post('/signup', {
                name: $scope.signupForm.name,
                email: $scope.signupForm.email,
                password: $scope.signupForm.password
            })
            .then(function onSuccess(sailsResponse) {
                window.location = '/';
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
                $scope.signupForm.loading = false;
            })
    };
}]);