var db = require('../db');
module.exports = function getMerchantItem(req, res) {
  var merchantName = req.params.merchantName;
  res.send(db.getMerchantItem(merchantName));
};
