angular.module('myApp.auth')
.factory("AuthFactory", [function(){
  var AuthFactory = {};
  //TODO: make this an actual thing and not some nonsense
  AuthFactory.username = "makersquare18";
  return AuthFactory;
}]);