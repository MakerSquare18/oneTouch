'use strict';
angular.module('myApp.auth')
.factory('AuthFactory', ['RequestFactory', function(RequestFactory) {
  var AuthFactory = {};
  AuthFactory.signupUser = function(username, password) {
    var context = this;
    return RequestFactory.signupUser(username, password)
      .then(function(data) {
        console.log('signupUser')
      });
  };
 return AuthFactory;
}]);