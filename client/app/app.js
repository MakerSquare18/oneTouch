'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.user',
  'myApp.merchant',
  'myApp.version',
  'myApp.merchantAuth',
  'myApp.userAuth'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/user'});
}]);
