var db = require('../db');
var paypal = require('../paypal');

module.exports = function createUser(req, res) {
  var newUsername = req.body.username;
  var newUserPassword = req.body.password;
  var newUserInfo = req.body.userInfo;
  var newUserCreditCard = req.body.creditCard;
  var newUser = {
    username: newUsername,
    password: newUserPassword,
    info: newUserInfo,
    creditCard: null,
  };

  db.createUser(newUser);
  paypal.storeCreditCard(db.paypalServerAuth.token, newUsername, newUserCreditCard)
  .then(function(creditCardVault) {
    db.users[newUsername].creditCard = creditCardVault.id;
    // console.log(db.users[newUsername]);
    // console.log(creditCardVault);
    res.send("User created successfully");
  });
};

