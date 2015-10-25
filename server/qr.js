var qr = require('qr-image');

var createReceiptQR = function(encodeObj) {
  var png_string = qr.imageSync(JSON.stringify(encodeObj), { type: 'png' });
  // console.log(svg_string);
  return png_string;
}

exports.createReceiptQR = createReceiptQR;
