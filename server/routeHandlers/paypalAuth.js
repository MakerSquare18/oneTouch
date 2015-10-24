var db = require('../db');
var paypal = require('../paypal');

module.exports = function(req, res) {
  paypal.requestAuthorizationToken(req.paypalAuthorizationCode)
  .then(function(authTokens) {
    db.merchants[req.merchantId] = {};
    db.merchants[req.merchantId].auth = {
      accessToken: authTokens.access_token,
      refreshToken: authTokens.refresh_token
    };
  });
};