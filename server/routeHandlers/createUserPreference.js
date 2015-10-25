var db = require('../db');
module.exports = function createUserPreference(req, res) {
  console.log("creating user preference...");
  var newPreferenceIndex = db.createUserPreference({
    username: req.body.username,
    merchantId: req.body.merchantId,
    itemId: req.body.itemId || 0
  });

  res.send(newPreferenceIndex);
};
