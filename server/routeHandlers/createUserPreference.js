var db = require('../db');
module.exports = function createUserPreference(req, res) {
  var newPreferenceUsername = req.body.username;
  newPreferenceMerchantId = req.body.merchantId;
  var newPreferenceItemId = req.body.itemId;
  var newPreferenceIndex = db.users[newPreferenceUsername].preferences.push({
    merchantId: newPreferenceMerchantId,
    itemId: newPreferenceItemId
  });
  res.send(newPreferenceIndex);
};