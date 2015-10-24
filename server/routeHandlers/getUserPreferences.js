var db = require('../db');
module.exports = function createMerchant(req, res) {
  var username = req.params.username;
  res.send(db.users[username].preferences);
};