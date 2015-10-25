var db = require('../db');
var paypal = require('../paypal');

module.exports = function createMerchant(req, res) {
  var newMerchantName = req.body.merchantName;
  var newMerchantInfo = req.body.merchantInfo;
  var newMerchantClientId = req.body.merchantClientId;
  var newMerchantSecret = req.body.merchantSecret;
  var newMerchant = {
    merchantName: newMerchantName,
    info: newMerchantInfo,
    items: []
  };
  db.createMerchant(newMerchant);
  paypal.authorizeServer(newMerchantClientId, newMerchantSecret)
  .then(function(merchantTokens) {
    db.merchants[merchantName].auth.token = merchantTokens.access_token;
    db.merchants[merchantName].auth.expiresIn = merchantTokens.expires_in;
    res.send(db.merchants[newMerchantName]);
  });
};
