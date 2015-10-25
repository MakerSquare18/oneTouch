//this will use the request service
'use strict';
angular.module('myApp.user')
.factory("UserFactory", ["RequestFactory", function(RequestFactory) {
  var UserFactory = {};
  //This endpoint should give me an array of ALL possible preferences
  UserFactory.getUserData = function(){
    //set context for ".then"
    var context = this;
    return RequestFactory.getUserData()
      .then(function(data){
        context.userData = data});
  };
  //this endpoint should give me an object with username, user prof, and an array
  //of all the users selected preferences.
  UserFactory.getAllPossiblePreferences = function(username){
    var context = this;
    //sets factory preferences to the data from the all preferences endpoint
    return RequestFactory.getAllPossiblePreferences()
      .then(function(data){
        context.allPreferences = data});
  };
  return UserFactory;
}]);