var db = require('../db');
module.exports = function createMerchant(req, res) {
  var merchants = db.merchants;
  res.send(db.getAllItems());
};
