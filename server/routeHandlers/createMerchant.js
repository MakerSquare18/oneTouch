var db = require('../db');
var paypal = require('../paypal');
var Bluebird = require('bluebird');

// Paypal sauce
var CONFIG = require('../paypal/paypalConfig');

module.exports = function createMerchant(req, res) {
  return new Promise(function(resolve, reject) {
    var newMerchantName = req.body.merchantName;
    var newMerchantInfo = req.body.merchantInfo;
    // var newMerchantClientId = req.body.merchantClientId;
    // var newMerchantSecret = req.body.merchantSecret;
    // var newMerchant = {
    //   merchantName: newMerchantName,
    //   info: newMerchantInfo,
    //   items: []
    // };

    var newMerchant = {
      merchantName: req.body.merchantName,
      password: req.body.password,
      info: req.body.merchantInfo || {},
      items: []
    };

    var newMerchantClientId = CONFIG.CLIENT_ID;
    var newMerchantSecret = CONFIG.SECRET;
    db.createMerchant(newMerchant);
    paypal.authenticateServer(newMerchantClientId, newMerchantSecret)
    .then(function(merchantTokens) {
      db.merchants[newMerchantName].auth.token = merchantTokens.access_token;
      db.merchants[newMerchantName].auth.expiresIn = merchantTokens.expires_in;
      res.send(db.merchants[newMerchantName]);
      resolve(db.merchants[newMerchantName]);
    });
  });
};
