var db = require('../db');
module.exports = function createMerchant(req, res) {
  var newMerchantName = req.body.merchantName;
  var newMerchantInfo = req.body.merchantInfo;
  newMerchantInfo.items = [];
  db.merchants[newMerchantName] = newMerchantInfo;
  res.send(db.merchants[newMerchantName]);
};