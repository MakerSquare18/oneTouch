var db = require('../db');
var paypal = require('../paypal');

module.exports = function createUser(req, res) {
  return new Promise(function(resolve, reject) {
    var newUsername = req.body.username;
    var newUserPassword = req.body.password;
    var newUserInfo = req.body.userInfo;
    var newUserCreditCard = req.body.creditCard;
    var newUserProfileUrl = req.body.profileUrl;

    var newUser = {
      username: newUsername,
      password: newUserPassword,
      info: newUserInfo,
      profileUrl: newUserProfileUrl,
      creditCardIds: {},
    };

    db.createUser(newUser);

    var merchantsArray = Object.keys(db.merchants);
    var vaultCounter = 0;
    merchantsArray.forEach(function(merchant) {
      var merchantToken = db.merchants[merchant].auth.token;
      paypal.storeCreditCard(merchantToken, newUsername, newUserCreditCard)
      .then(function(creditCardVault) {
        vaultCounter++;
        db.users[newUsername].creditCardIds[merchant] = creditCardVault.id;
        if (vaultCounter === merchantsArray.length) {
          res.send("User created successfully");
          resolve();
        }
      });
    });
  });
};

