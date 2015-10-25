'use strict';
angular.module('myApp.services', [])
.factory('RequestFactory', ['$http',function($http) {
  var RequestFactory = {};
  //This endpoint should give me an array of ALL possible preferences
  RequestFactory.getAllPossiblePreferences = function(){
    return $http({
      method: 'GET',
      url: '/api/items',
    }).then(function(res){
      console.log('got allPreferences data!');
      console.log('pref data: ', res.data);
      return res.data;
    },function(error) {
      console.log('problem getting allPref data: ',error);
      return;
    });
  };
  //this endpoint should give me an object with username, user prof, and an array
  //of all the users selected preferences.
  RequestFactory.getUserData = function(username){
    //TODO: don't hardcode username lol get it from auth factory
    var username = "makersquare18";
    console.log("in getUserData req fac");
    return $http({
      method: 'GET',
      url: '/api/user/'+ username,
    }).then(function(res){
      console.log('got user data!');
      console.log('user data: ', res);
      return res.data;
    },function(error) {
      console.log('problem getting user data: ',error);
      return;
    });
  };
  //this endpoint sends and object containing name, price, and description properties for a new merchant item being created
  RequestFactory.createMerchantItem = function(itemData) {
    return $http({
      method: 'POST',
      url: '/api/merchant/item'
    }).then(function(res) {
      console.log('created merchant item!');
      return res.data;
    }, function(error) {
      console.log('problem creating a new merchant item: ', error);
      return;
    });
  };
  //this endpoint gets all information related to merchant items for a given merchant
  RequestFactory.getMerchantData = function(merchant) {
    console.log("Merchant is:", merchant);
    return $http({
      method: 'GET',
      url: '/api/merchant/'+ merchant,
    }).then(function(res) {
      console.log('got merchant data!');
      console.log('res: ', res);
      return res.data;
    }, function(error) {
      console.log('problem getting merchant data: ', error);
      return;
    });
  };
  //POST a new preference to the user's watch display
  //TODO: confer w/ Ian about format of data
  RequestFactory.addPreference = function(data){
    console.log("adding pref!");
    var username = "makersquare18";
    console.log('in addPreference req fac');
    return $http({
      method: 'POST',
      url: '/api/user/item',
      data: data
    }).then(function(res){
      console.log('posted pref');
      console.log('got user data!');
      console.log('add preference res: ', res);
      return res.data;
    },function(error) {
      console.log("problem posting pref: ",error);
      return;
    });
  };
  RequestFactory.signupUser = function(userData) {
    return $http({
      method: 'POST',
      url: 'api/user/',
      data: userData
    }).then(function(res) {
      console.log('created user in requestfactory');
      console.log('signupUpser res: ', res);
      return res.data;
    }, function(error) {
      console.log('problem signing up user: ', error);
      return;
    });
  };
  RequestFactory.signupMerchant = function(merchantData) {
    return $http({
      method: 'POST',
      url: 'api/merchant/',
      data: merchantData
    }).then(function(res) {
      console.log('created merchant in requestfactory');
      console.log('signupMerchant res: ', res);
      return res.data;
    }, function(error) {
      console.log('problem signing up merchant');
    });
  }
  return RequestFactory;
}]);
