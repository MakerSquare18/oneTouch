var db = require('../db');
module.exports = function createMerchant(req, res) {
  var itemName = req.body.item.name;
  var itemPrice = req.body.item.price;
  var merchantId = req.body.id;
  var merchantItemIndex = db.merchants[merchantId].items.push(item);
  res.send(merchantItemIndex);
};