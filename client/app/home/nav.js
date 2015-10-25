'use strict';

angular.module('myApp.nav', [])

.controller('NavCtrl', ["$scope","$location",function($scope, $location) {
  $scope.tab = 1; 
}]);