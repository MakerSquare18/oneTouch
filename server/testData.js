var db = require('./db');
var createUser = require('./routeHandlers/createUser');
var createMerchant = require('./routeHandlers/createMerchant');

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

var res = {
  send: function() {

  }
}

createUser(req, res);

req = {
  body: {
    merchantName: "starbucks",
    merchantClientId:"",
    merchantSecret:"",
    info: {
      name: "starbucks"
    },
    items: [
    {
      name: "Latte",
      price: 3.25,
      description: "Delicious latte"
    },
    {
      name: "better Latte",
      price: 6.00,
      description: "Delicious latte"
    },
    ]
  }
};

createMerchant(req, res);

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
})

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

console.log(db.itemsTable);
console.log(db.merchants["starbucks"].items);
console.log(db.users);
