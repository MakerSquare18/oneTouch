'use strict';
angular.module('myApp.merchant')
.factory('MerchantFactory', ['RequestFactory', function(RequestFactory) {
  var MerchantFactory = {};
  MerchantFactory.createMerchantItem = function(itemData) {
    var context = this;
      return RequestFactory.createMerchantItem(itemData)
      .then(function(data) {
        console.log('posted data');
      });
  };
  MerchantFactory.getMerchantData = function(merchant) {
    var context = this;
    return RequestFactory.getMerchantData(merchant)
      .then(function(data) {
        context.allItemData = data;
      });
  };
  return MerchantFactory;
}]);
