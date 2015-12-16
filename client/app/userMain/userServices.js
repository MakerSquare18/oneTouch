//this will use the request service
'use strict';
angular.module('myApp.user')
.factory("UserFactory", ["RequestFactory", "$q", function(RequestFactory, $q) {
  var UserFactory = {};
  //This method should give me an array of ALL possible preferences
  UserFactory.getUserData = function(){
    //set context for ".then"
    var context = this;
    console.log("in getUserData");
    return RequestFactory.getUserData()
      .then(function(data){
        context.userData = data});
  };
  //this method should give me an object with username, user prof, and an array
  //of all the users selected preferences.
  UserFactory.getAllPossiblePreferences = function(){
    var context = this;
    //sets factory preferences to the data from the all preferences endpoint
    return RequestFactory.getAllPossiblePreferences()
      .then(function(data){
        console.log("in getAllPossiblePreferences");
        //TODO: filter allPrefs to not include user's current prefs
        context.allPreferencesUnfiltered = data});
  };

  //This function is needed to
  //properly filter duplicates out of the allPossiblePreferences
  UserFactory.resolver = function(){
    var context = this;
    //all will wait until both of our calls are resolved, so we never filter before both have been resolved
    return $q.all([context.getUserData(), context.getAllPossiblePreferences()]).then(
    //cover your eyes shit's about to get hacky. I iterate though the array of user prefs and store their ids in a lookup Obj.
    //Then I iterate through the allPrefs object and remove any with matching ids, which should be unique
    function(){
      context.allPreferences = [];
      var unfiltered = context.allPreferencesUnfiltered;
      var userPrefs = context.userData.preferences;
      var lookupObj = {};
      for(var j=0; j<userPrefs.length; j++){
        lookupObj[userPrefs[j]["_g_itemId"]] = true;
      }
      for(var i=0; i<unfiltered.length; i++){
        if(!lookupObj[unfiltered[i][["_g_itemId"]]]){
          context.allPreferences.push(unfiltered[i]);
        }
      }
    });
  }
  //addPreference does 3 things simultaneously:
  //1) posts a new user pref (async)
  //2) removes a pref from the possible preferences to add
  //3) adds the user pref to the users' view
  UserFactory.addPreference = function(prefIndex){
    var context = this;
    var addedPref = context.allPreferences.splice(prefIndex, 1)[0];
    RequestFactory.addPreference(
      { username: context.userData.username,
        itemId: addedPref._g_itemId,
        merchantId: addedPref.merchantId});
    context.userData.preferences.push(addedPref);

  }
  return UserFactory;
}]);
