var db = require('../db');
module.exports = function createMerchant(req, res) {
  var newMerchantName = req.body.merchantName;
  var newMerchantInfo = req.body.merchantInfo;
  var newMerchant = {
    info: newMerchantInfo,
    items: []
  }
  // db.merchants[newMerchantName] = {
  //   info: newMerchantInfo,
  //   items: []
  // };
  res.send(db.merchants[newMerchantName]);
};
