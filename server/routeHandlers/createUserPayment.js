var db = require('../db');
var paypal = require('../paypal');

module.exports = function createUserPayment(req, res) {
  var username = req.body.username;
  var merchantId = req.body.merchantId;
  var itemId = req.body.itemId;

  console.log("username:", username);
  console.log("merchantId", merchantId);
  console.log("itemId", itemId);

  var userCreditCardId = db.users[username].creditCardIds[merchantId];
  var merchantBearerToken = db.merchants[merchantId].auth.token;
  console.log("merchantBearerToken:", merchantBearerToken);
  var amount = db.merchants[merchantId].items[itemId].price;
  console.log("amount: ", amount);

  paypal.retrieveCreditCard(merchantBearerToken, userCreditCardId)
  .then(function(retrievedCreditCard) {
    var creditCardToken = {
      credit_card_id: userCreditCardId,
      payer_id: retrievedCreditCard.payer_id,
    };
    console.log("creditCardToken: ", creditCardToken);
    var payer = {
      payment_method: 'credit_card',
      funding_instruments: [{credit_card_token: creditCardToken}]
    };
    paypal.makePayment(merchantBearerToken, payer, amount)
    .then(function(paymentResponse) {
      console.log(paymentResponse)
    });
  });
};