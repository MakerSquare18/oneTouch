'use strict';

angular.module('myApp.merchant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/merchant', {
    templateUrl: 'merchantMain/merchant.html',
    controller: 'MerchantCtrl'
  });
}])
.controller('MerchantCtrl', ['$scope', function($scope) {
  $scope.merchantData = {};
  $scope.merchantData.profileImg = "http://thetshirtgame.com/neon_yolo_you_only_live_once_azalea_pink_bkgd.gif";
  $scope.merchantData.merchantname = "Starbucks";
  $scope.merchantData.merchantItems = [];
  $scope.merchantData.merchantItems[0] = {itemid: 1, name: "Venti Mocha Latte", price: 4.99, description: "Large delicious latte from Starbucks"};
  $scope.merchantData.merchantItems[1] = {itemid: 2, name: "Large Cheese Pizza", price: 9.99, description: "Delicious cheese pizza from Dominos"};
  $scope.addMerchantItem = function(item) {
    $scope.merchantData.merchantItems.push(item);
  };
}]);