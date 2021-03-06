/**
 * @app.js
 * @Author       : Birendra Kumar
 * @Dated        : 24-08-2015
 * @description :: Client side angular routing
 */
var winperson = angular.module('winpersonApp', ['ngRoute', 'toastr', 'compareTo']);
winperson.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/login.html',
            controller: 'UserController'
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'UserController'
        })
        .when('/job', {
            templateUrl: '/views/job.html',
            controller: 'JobController'
        })
        .when('/question/:id', {
            templateUrl: '/views/question.html',
            controller: 'QuestionController'
        })
        .when('/dashboard', {
            templateUrl: '/views/dashboard.html'
        })
        .when('/invite', {
            templateUrl: '/views/invite.html',
            controller: 'InviteController'
        })
        .when('/sendEmail', {
            templateUrl: '/views/sendemail.html',
            controller: 'InviteController'
        })
        .when('/test/:token', {
            templateUrl: '/views/test.html',
            controller: 'TestpageController'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'UserController'
        });


});