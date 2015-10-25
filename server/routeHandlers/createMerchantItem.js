var db = require('../db');
module.exports = function createMerchantItem(req, res) {

  var g_itemId = db.createMerchantItem({
    name: req.body.name,        // itemname
    price: req.body.price,
    description: req.body.description,
    merchantId: req.body.merchantId,
    imageUrl: req.body.imageUrl
  });

  // global itemTable id
  res.send(g_itemId);
  // res.send(req.body);
};
