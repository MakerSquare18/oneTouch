var db = require('./db');

db.createUser({
  username: "makersquare18",
  info: {
    // name: "Richie",
    age: 23,
    profileImg: "www.google.com"
  },
  creditCard: {
    "number": "4417119669820331",
    "cvv2": 532,
    "expirationMonth": 11,
    "expirationYear": 2018,
    "firstName": "Richie",
    "lastName": "Artoul",
    "billingAddress": "asdfhjkasdfhasdl"
  }
});

db.createMerchant({
  merchantName: "starbucks",
  info: {
    name: "starbucks"
  }
});

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
