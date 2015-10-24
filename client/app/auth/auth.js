'use strict';

angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
    templateUrl: 'auth/login.html',
    controller: 'LoginCtrl'
    })
    .when('/userSignup', {
    templateUrl: 'auth/userSignup.html',
    controller: 'UserSignupCtrl'
    })
    .when('/merchantSignup', {
    templateUrl: 'auth/merchantSignup.html',
    controller: 'MerchantSignupCtrl'
    });
}])

.controller('LoginCtrl', [function() {

}])

.controller('UserSignupCtrl', [function() {

}])

.controller('MerchantSignupCtrl', [function() {

}]);