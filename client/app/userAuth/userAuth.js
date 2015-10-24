'use strict';

angular.module('myApp.userAuth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/userLogin', {
    templateUrl: 'userAuth/userLogin.html',
    controller: 'UserLoginCtrl'
    })
    .when('/userSignup', {
    templateUrl: 'userAuth/userSignup.html',
    controller: 'UserSignupCtrl'
    });
}])

.controller('UserLoginCtrl', [function() {

}])

.controller('UserSignupCtrl', [function() {

}]);