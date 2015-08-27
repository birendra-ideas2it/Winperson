/**
 * @question.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Client side manages question.
 */
angular.module('winpersonApp').controller('QuestionController', ['$scope', '$http', '$routeParams', 'toastr', function($scope, $http, $routeParams, toastr) {


    /**
     *This function is used for sending request to server.
     */

    $scope.submitquestionForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.questionForm.loading = true;
        var jsonObject = JSON.parse($scope.questionForm.question);

        // Submit request to Sails.
        $http.post('/question', {
                question: jsonObject,
                jobid: $routeParams.id,
                timePerQues: $scope.questionForm.timePerQues,
                quesPerTest: $scope.questionForm.quesPerTest
            })
            .then(function onSuccess() {
                // Refresh the page now that we've been logged in.
                window.location = '#/invite';
            })
            .finally(function eitherWay() {
                $scope.questionForm.loading = false;
            });
    };


}]);