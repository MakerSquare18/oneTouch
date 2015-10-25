'use strict';
angular.module('myApp.services', [])
.factory("RequestFactory", ['$http',function($http) {
  var RequestFactory = {};
  //This endpoint should give me an array of ALL possible preferences
  RequestFactory.getAllPossiblePreferences = function(){
    return $http({
      method: 'GET',
      url: '/api/items',
    }).then(function(res){
      console.log('got allPreferences data!');
      return res.data;
    },function(error) {
      console.log("problem getting allPref data: ",error);
      return;
    });
  };
  //this endpoint should give me an object with username, user prof, and an array
  //of all the users selected preferences.
  RequestFactory.getUserData = function(username){
    //TODO: don't hardcode username lol get it from auth factory
    var username = "makersquare18";
    console.log("in getUserData req fac")
    return $http({
      method: 'GET',
      url: '/api/user/'+ username,
    }).then(function(res){
      console.log('got user data!');
      console.log('res: ', res);
      return res.data;
    },function(error) {
      console.log("problem getting user data: ",error);
      return;
    });
  };
  //POST a new preference to the user's watch display
  //TODO: confer w/ Ian about format of data
  RequestFactory.addPreference = function(preference){
    console.log('in addPreference req fac');
    return $http({
      method: 'POST',
      url: '/api/user/'+ username,
    }).then(function(res){
      console.log('got user data!');
      console.log('res: ', res);
      return res.data;
    },function(error) {
      console.log("problem getting user data: ",error);
      return;
    });
  }
  return RequestFactory;
}]);