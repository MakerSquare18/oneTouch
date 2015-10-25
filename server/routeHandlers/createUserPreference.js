var db = require('../db');
module.exports = function createUserPreference(req, res) {
  console.log("creating user preference...");
  console.log("userId: ", req.body.itemId)
  var newPreferenceIndex = db.createUserPreference({
    username: req.body.username,
    merchantId: req.body.merchantId,
    itemId: req.body.itemId
  });

  res.send(newPreferenceIndex);
};
