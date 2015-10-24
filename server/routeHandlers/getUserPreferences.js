var db = require('../db');
module.exports = function createMerchant(req, res) {
  var username = req.params.username;
  // search database
  var userInfoDump = db.getMixinPrefListByUsername(req.params.username);
  res.send(userInfoDump);
};
