'use strict';

angular.module('myApp.nav', [])

.controller('NavCtrl', ["$scope","$location",function($scope, $location) {
  var locationObj ={"/user": 1,
                    "/merchant": 2,
                    "/merchantSignup": 3,
                    "/userSignup": 4 }
  $scope.tab = locationObj[$location.path()];
}]);