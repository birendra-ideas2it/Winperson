/**
 * @User.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
angular.module('winpersonApp').controller('UserController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
    // set-up loading state
     $scope.signupForm = {
        loading: false
    }
    /**
     *This function is used for send request submitSignup .
     */
    $scope.submitSignupForm = function() {
        console.log('-----signup name----',$scope.signupForm.name);
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
    }
    /**
     *This function is used for send request login submit .
     */
    $scope.submitLoginForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.loginForm.loading = true;

        // Submit request to Sails.
        $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
            })
            .then(function onSuccess() {
                // Refresh the page now that we've been logged in.
                window.location = '#/job';
            })
            .catch(function onError(sailsResponse) {

                // Handle known error type(s).
                // Invalid username / password combination.
                if (sailsResponse.status === 400 || 404) {
                    // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                    //
                    toastr.error('Invalid email/password combination.', 'Error', {
                        closeButton: true
                    });
                    return;
                }

                toastr.error('An unexpected error occurred, please try again.', 'Error', {
                    closeButton: true
                });
                return;

            })
            .finally(function eitherWay() {
                $scope.loginForm.loading = false;
            });
    };

}]);
