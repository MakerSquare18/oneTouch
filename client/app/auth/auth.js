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

.controller('UserSignupCtrl', ['$scope', '$location', 'AuthFactory', function($scope, $location, AuthFactory) {
    $scope.user = {};
    $scope.signupUser = function() {
        AuthFactory.signupUser($scope.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (error) {
            console.error(error);
          });
    };
}])

.controller('MerchantSignupCtrl', ['$scope', '$location', 'AuthFactory', function($scope, $location, AuthFactory) {
    $scope.merchant = {};
    $scope.signupMerchant = function() {
        AuthFactory.signupMerchant($scope.merchant)
            .then(function() {
                $location.path('/merchant');
            })
            .catch(function(error) {
                console.error(error);
            });
    };
}]);