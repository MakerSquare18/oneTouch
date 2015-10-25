var db = require('../db');
module.exports = function createUserPreference(req, res) {
  var newPreferenceIndex = db.createUserPreference({
    username: req.body.username,
    merchantId: req.body.merchantId,
    itemId: req.body.itemId
  });

  res.send(newPreferenceIndex);
};
