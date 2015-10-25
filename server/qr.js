var qr = require('qr-image');

var createReceiptQR = function(encodeObj) {
  var png_string = qr.imageSync(JSON.stringify(encodeObj), { type: 'png', margin: 0});
  return png_string;
}

module.exports = createReceiptQR;
