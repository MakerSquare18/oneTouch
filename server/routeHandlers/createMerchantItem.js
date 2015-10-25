var db = require('../db');
module.exports = function createMerchantItem(req, res) {

  var g_itemId = db.createMerchantItem({
    name: req.body.name,        // itemname
    price: parseInt(req.body.price),
    description: req.body.description,
    merchantId: req.body.merchantId,
    imageUrl: req.body.imageUrl
  });

  res.send(g_itemId);
};
