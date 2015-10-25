'use strict';
angular.module('myApp.merchant')
.factory('MerchantFactory', ['RequestFactory', function(RequestFactory) {
  var MerchantFactory = {};
  //This should post the item to the server, and quickly add it to the listed items
  MerchantFactory.createMerchantItem = function(itemData) {
    RequestFactory.createMerchantItem(itemData);
    this.allItemData.push(itemData);
  };
  MerchantFactory.getMerchantData = function(merchant) {
    var context = this;
    MerchantFactory.merchantName = merchant;
    return RequestFactory.getMerchantData(merchant)
      .then(function(data) {
        context.allItemData = data;
      });
  };
  return MerchantFactory;
}]);
