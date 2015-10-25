var qr = require('qr-image');
module.exports = function createReceiptQR(req, res) {
  console.log(qr);
  res.send("Some");
}
