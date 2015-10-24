'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'userMain/user.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope', function($scope) {
  $scope.userData = {};
  $scope.userData.profileImg = "http://vignette3.wikia.nocookie.net/60seconds/images/0/02/Filepicker-cu8RtvHTyLM2781g44RQ_YOLO.jpg/revision/latest?cb=20150918035211";
  $scope.userData.username = "David";
  $scope.userData.userItems = [];
  $scope.userData.userItems[0] = {name: "Venti Mocha Latte", url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png", price: 4.99, merchant: "Starbucks", description: "Large delicious latte from starbucks"};
}]);