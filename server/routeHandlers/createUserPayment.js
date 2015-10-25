var db = require('../db');
var paypal = require('../paypal');
var qr = require('../qr');
var mail = require('../mail');

module.exports = function createUserPayment(req, res) {
  var username = req.body.username;
  var merchantId = req.body.merchantId;
  var itemId = req.body.itemId;

  var userCreditCardId = db.users[username].creditCardIds[merchantId];
  var merchantBearerToken = db.merchants[merchantId].auth.token;
  var amount = req.body.itemType ? db.locationItems[itemId].price : db.getMerchantItemInfoFromTableId(itemId).price;

  // Moved this here so people wouldnt have to wait for laoding during demo
  res.send(qr(req.body.itemType ? db.locationItems[itemId].name : db.getMerchantItemInfoFromTableId(itemId).name));
  mail.sendEmail({
    recipient: req.body.itemType ? db.merchants[db.locationItems[itemId].merchantId].info.email : db.merchants[merchantId].info.email,
    subject: "New Transaction!",
    message: username + " purchased a " + (req.body.itemType ? db.locationItems[itemId].name : db.getMerchantItemInfoFromTableId(itemId).name) + " from you!"
  });

  paypal.retrieveCreditCard(merchantBearerToken, userCreditCardId)
  .then(function(retrievedCreditCard) {
    var creditCardToken = {
      credit_card_id: userCreditCardId,
      payer_id: retrievedCreditCard.payer_id,
    };
    var payer = {
      payment_method: 'credit_card',
      funding_instruments: [{credit_card_token: creditCardToken}]
    };
    paypal.makePayment(merchantBearerToken, payer, amount)
    .then(function(paymentResponse) {
      console.log('payment Success: ', paymentResponse);
      // res.send(qr(itemId));
    });
  });
};
