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
  //TODO: remove dummy data and refactor view so it works n shit
  //TODO: consider using watchers instead of somewhat hackily
  $scope.userData.profileImg = "http://vignette3.wikia.nocookie.net/60seconds/images/0/02/Filepicker-cu8RtvHTyLM2781g44RQ_YOLO.jpg/revision/latest?cb=20150918035211";
  $scope.userData.username = "David";
  $scope.addItem = function(item) {
    console.log(item);
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