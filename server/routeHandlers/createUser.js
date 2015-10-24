var db = require('../db');
module.exports = function createUser(req, res) {
  var newUsername = req.body.username;
  var newUserPassword = req.body.password;
  var newUserInfo = req.body.userInfo;
  var newUserCreditCard = req.body.creditCard;
  db.merchants[newUsername] = {
    info: newUserInfo,
    creditCard: newUserCreditCard,
    preferences: []
  };
  res.send(db.merchants[newUsername]);
};