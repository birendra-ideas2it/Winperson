/**
 * @test.js
 * @Author       : Birendra Kumar
 * @Dated        : 27-08-2015
 * @description :: Client side manages question.
 */

angular.module('winpersonApp').controller('TestpageController', ['$scope', '$http', '$routeParams', 'toastr', function($scope, $http, $routeParams, toastr) {


    /**
     *This function is used for sending request to server.
     */

    $scope.getToken = function() {
        // Submit request to Sails.
        console.log('-----hiiiii----test giver');
        $http.post('/test', {
                token:$routeParams.token
            })
            .then(function onSuccess() {
                // Refresh the page now that we've been logged in.
                window.location = '#/job';
            })
            .finally(function eitherWay() {

            });
    };


}]);