'use strict';
angular.module('myApp.auth')
.factory('AuthFactory', ['RequestFactory', function(RequestFactory) {
  var AuthFactory = {};
  AuthFactory.signupUser = function(userdata) {
    var context = this;
    return RequestFactory.signupUser(userdata)
      .then(function(data) {
        console.log('signupUser')
      });
  };
  AuthFactory.signupMerchant = function(merchantData) {
    var context = this;
    return RequestFactory.signupMerchant(merchantData) 
    .then(function(data) {
      console.log('signupMerchant');
    });
  };
 return AuthFactory;
}]);