var db = require('../db');

module.exports = function createMerchant(req, res) {
  var newMerchantName = req.body.merchantName;
  var newMerchantInfo = req.body.merchantInfo;
  var newMerchant = {
    merchantName: newMerchantName,
    info: newMerchantInfo,
    items: []
  };
  db.createMerchant(newMerchant);
  // db.merchants[newMerchantName] = {
  //   info: newMerchantInfo,
  //   items: []
  // };
  res.send(db.merchants[newMerchantName]);
};
