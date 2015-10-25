var db = require('../db');
module.exports = function createMerchantItem(req, res) {

  var g_itemId = db.createMerchantItem({
    name: req.body.item.name,
    price: req.body.item.price,
    description: req.body.description,
    merchantId: req.body.id,
    imageURL: req.body.imageURL
  });

  // global itemTable id
  res.send(g_itemId);
};
