'use strict';

angular.module('myApp.merchant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/merchant', {
    templateUrl: 'merchantMain/merchant.html',
    controller: 'MerchantCtrl'
  });
}])

.controller('MerchantCtrl', [function() {

}]);