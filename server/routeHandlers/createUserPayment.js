var db = require('../db');
var paypal = require('../paypal');
var qr = require('../qr');
var mail = require('../mail');

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
  var amount = req.body.itemType ? db.locationItems[itemId].price : db.merchants[merchantId].items[itemId].price;
  console.log("amount: ", amount);

  // Moved this here so people wouldnt have to wait for laoding during demo
  res.send(qr(itemId));
  console.log('Emailing: ', db.merchants[db.locationItems[itemId].merchantId].info.email);
  console.log(db);
  mail.sendEmail({
    recipient: req.body.itemType ? db.merchants[db.locationItems[itemId].merchantId].info.email : db.merchants[merchantId].info.email,
    subject: "New Transaction!",
    message: username + " purchased a " + (req.body.itemType ? db.locationItems[itemId].name : db.merchants[merchantId].items[itemId].name) + " from you!"
  });

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
      // res.send(qr(itemId));
    });
  });
};