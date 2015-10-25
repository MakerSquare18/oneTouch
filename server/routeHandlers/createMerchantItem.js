var db = require('../db');
module.exports = function createMerchantItem(req, res) {
  var itemName = req.body.item.name;
  var itemPrice = req.body.item.price;
  var itemImage = req.body.item.image;
  var itemDesc = req.body.item.desc;
  var merchantId = req.body.id;
  var merchantItemIndex = db.merchants[merchantId].items.push({
    name: itemName,
    price: itemPrice,
    image: itemImage,
    itemDesc: itemDesc
  });
  res.send(merchantItemIndex);
};
