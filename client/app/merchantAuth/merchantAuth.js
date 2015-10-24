'use strict';

angular.module('myApp.merchantAuth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/merchantLogin', {
    templateUrl: 'merchantAuth/merchantLogin.html',
    controller: 'MerchantLoginCtrl'
    })
    .when('/merchantSignup', {
    templateUrl: 'merchantAuth/merchantSignup.html',
    controller: 'MerchantSignupCtrl'
    });
}])

.controller('MerchantLoginCtrl', [function() {

}])

.controller('MerchantSignupCtrl', [function() {

}]);