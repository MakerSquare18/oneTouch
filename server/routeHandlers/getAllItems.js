var db = require('../db');
module.exports = function createMerchant(req, res) {
  var merchants = db.merchants;
  var allItems = [];
  for (var merchant in merchants) {
    merchants[merchant].items.forEach(function(item) {
      allItems.push({
        merchantId: merchant,
        itemInfo: item
      });
    });
  }
  res.send(allItems);
};