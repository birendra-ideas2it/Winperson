/**
 * @login.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description ::  This file for angular routing and request send to Server.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
angular.module('winpersonApp').controller('LoginController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
    /**
     *This function is used for send request submitLogin .
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