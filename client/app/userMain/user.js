'use strict';

angular.module('myApp.user', ['ngRoute', 'myApp.services'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'userMain/user.html',
    controller: 'UserCtrl',
    resolve: UserCtrl.resolve
  });
}]);

//This controller function is actually added at the bottom. This lets us play a bit
//This lets us add a resolve method in a somewhat reasonable manner.
function UserCtrl($scope, UserFactory) {
  $scope.userData = UserFactory.userData;
  $scope.allPreferences = UserFactory.allPreferences;
  console.log("userData in ctrl: ", $scope.userData);
  console.log("allPreferences in ctrl: ", $scope.allPreferences);
  //TODO: remove dummy data and refactor view so it works
  $scope.addItem = function(itemIndex) {
    console.log("messing w/ ", itemIndex);
    UserFactory.addPreference(itemIndex);
  }; 
  $scope.removeItem = function(item) {
    console.log(item);
  };
}
UserCtrl.resolve = {
  resolver: function(UserFactory){
    return UserFactory.resolver();
  }
};

//this is the usual stuff
angular.module('myApp.user').controller('UserCtrl', ['$scope', 'UserFactory', UserCtrl]);
