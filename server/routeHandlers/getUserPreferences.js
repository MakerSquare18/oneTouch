var db = require('../db');
var geolib = require('geolib');

module.exports = function createMerchant(req, res) {
  var username = req.params.username;
  var userLatitude = req.query.latitude;
  var userLongitude = req.query.longitude;

  var userInfoDump = db.getUserPrefListByUsername(req.params.username);

  if (userLatitude && userLongitude) {
    var nearbyItems = [];
    db.locationItems.forEach(function(locationItem, index) {
      var distance = geolib.getDistance(
        {latitude: userLatitude, longitude: userLongitude},
        {latitude: locationItem.latitude, longitude: locationItem.longitude});
      if (distance <= 500) {
        locationItem["_g_itemId"] = index;
        locationItem.type = "location";
        nearbyItems.push(locationItem)
      }
    });

    nearbyItems.forEach(function(nearbyItem, index) {
      userInfoDump.preferences.push(nearbyItem);
    });
  }
  res.send(userInfoDump);
};
