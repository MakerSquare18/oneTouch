var db = require('./db');
var createUser = require('./routeHandlers/createUser');
var createMerchant = require('./routeHandlers/createMerchant');

var res = {
  send: function() {

  }
}

var req = {
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
    merchantId: "starbucks",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png" // g_itemId;

  });
  console.log(3);

  db.createMerchantItem({
    name: "wrap",
    price: 7.00,
    description: "Tasty wrap",
    merchantId: "starbucks",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png" // g_itemId;

  });
  db.createMerchantItem({
    name: "gross booger",
    price: 9.00,
    description: "nobody has this as a pref",
    merchantId: "starbucks",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png" // g_itemId;

  });
  db.createMerchantItem({
    name: "desireable shortcake",
    price: 19.00,
    description: "I should add this tastiness",
    merchantId: "starbucks",
    imageUrl: "http://www.blogcdn.com/www.dailyfinance.com/media/2013/01/dominoes-pizza-1040-cs010213.jpg"
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
      itemId: 0
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
