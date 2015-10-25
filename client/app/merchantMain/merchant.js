'use strict';

angular.module('myApp.merchant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/merchant', {
    templateUrl: 'merchantMain/merchant.html',
    controller: 'MerchantCtrl'
  });
}])
.controller('MerchantCtrl', ['$scope', 'MerchantFactory', function($scope, MerchantFactory) {
  $scope.merchImage = 'http://thetshirtgame.com/neon_yolo_you_only_live_once_azalea_pink_bkgd.gif';
  $scope.merchName = 'Starbucks Team';
  $scope.itemData = {};
  $scope.merch = [];

  // $scope.getMerchantData();
  // Pull data from DB
  $scope.merch[0] = {name: "Venti Mocha Latte", itemid: 1, price: 4.99, description: "Large delicious latte from Starbucks"};
  $scope.merch[1] = {name: "Large Cheese Pizza", itemid: 2, price: 9.99, description: "Delicious cheese pizza from Dominos"};
  $scope.createMercantItem = function(itemData) {
    MerchantFactory.createMercantItem(itemData);
  };
  $scope.merchantData = {};
  $scope.init = function() {
     var merchant = 'starbucks';
     MerchantFactory.getMerchantData(merchant)
      .then(function() {
        $scope.merchantData = MerchantFactory.allItemData;
      });
  };
  $scope.init();
}]);
