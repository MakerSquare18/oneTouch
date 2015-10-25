var db = require('./db');
var createUser = require('./routeHandlers/createUser');
var createMerchant = require('./routeHandlers/createMerchant');

var res = {
  send: function() {

  }
}

req = {
  body: {
    merchantName: "starbucks",
    merchantClientId:"AQ_ofXvBpXHWViTvE626L02CCcrwRQstLJ58NMcwyCFAkp7GyhgPL9pnxUyI-quRCdm96is4F0jNTNqr",
    merchantSecret:"ENpnDYdA-FXh_MSXFUf4gyYkeJ4B7RqVXsGeEv2IB7JAp3zny1kgHqmjJ9-X_zm9WrnhDNN22krvbMK-",
    info: {
      name: "starbucks"
    },
  }
};

createMerchant(req, res)
.then(function() {
  // test itemTable junction table
  db.createMerchantItem({
    name: "burrito",
    price: 7.00,
    description: "Tasty burrito",
    merchantId: "starbucks"
  });

  db.createMerchantItem({
    name: "wrap",
    price: 7.00,
    description: "Tasty wrap",
    merchantId: "starbucks"
  });
  console.log("Resolved!");
  console.log("Merchant: ", db.merchants);
  var req = {
    body: {
      username : "makersquare18",
      password : "123qwe",
      userInfo : {
        name: "Richie",
        age: 23,
      },
      creditCard: {
        "number": "4417119669820331",
        "cvv2": 532,
        "expirationMonth": 11,
        "expirationYear": 2018,
        "firstName": "Richie",
        "lastName": "Artoul",
        // "billingAddress": "asdfhjkasdfhasdl"
      }
    }
  };

  createUser(req, res)
  .then(function() {
    db.createUserPreference({
      username: "makersquare18",
      merchantId: "starbucks",
      itemId: 0 // g_itemId;
    });

    db.createUserPreference({
      username: "makersquare18",
      merchantId: "starbucks",
      itemId: 1 // g_itemId;
    });
  });
});

// console.log(db.itemsTable);
// console.log(db.merchants["starbucks"].items);
// console.log(db.users);
