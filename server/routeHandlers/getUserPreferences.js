var db = require('../db');
var geolib = require('geolib');

module.exports = function createMerchant(req, res) {
  var username = req.params.username;
  var userLatitude = req.query.latitude;
  var userLongitude = req.query.longitude;

  if (userLatitude && userLongitude) {
    var nearbyItems = [];
    db.locationItems.forEach(function(locationItem, index) {
      var distance = geolib.getDistance(
        {latitude: userLatitude, longitude: userLongitude},
        {latitude: locationItem.latitude, longitude: locationItem.longitude});
      if (distance <= 500) {
        locationItem.locationId = index;
        nearbyItems.push(locationItem)
      }
    });

    if (nearbyItems.length > 0) {
      res.send({
        username: username,
        preferences: nearbyItems
      });
    } else {
      var userInfoDump = db.getUserPrefListByUsername(req.params.username);
      res.send(userInfoDump);
    }
  } else {
    var userInfoDump = db.getUserPrefListByUsername(req.params.username);
    res.send(userInfoDump);
  }
};
