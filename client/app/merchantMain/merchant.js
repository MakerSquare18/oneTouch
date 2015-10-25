'use strict';

angular.module('myApp.merchant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/merchant', {
    templateUrl: 'merchantMain/merchant.html',
    controller: 'MerchantCtrl',
    resolve: MerchantCtrl.resolve
  });
}]);

function MerchantCtrl($scope, MerchantFactory) {
  $scope.merch = MerchantFactory.allItemData;
  $scope.merchantName = MerchantFactory.merchantName;
  //for now, we don't have distinct icons for each product, just
  //one for the merchant. There would have to be a change on the backend to fix
  $scope.merchImage = $scope.merch[0].imageUrl;
  $scope.itemData = {imageUrl: $scope.merchImage};
  console.log("merch data in $scope: ", $scope.merch);
  // Pull data from DB
  $scope.createMerchantItem = function() {
    // Construct Payload
    $scope.itemData.merchantId = "starbucks";
    MerchantFactory.createMerchantItem($scope.itemData);
  };
}

MerchantCtrl.resolve = {
  loadData: function(MerchantFactory){
    return MerchantFactory.getMerchantData('starbucks');
  }
};
angular.module('myApp.merchant').controller('MerchantCtrl', ['$scope', 'MerchantFactory', MerchantCtrl]);
