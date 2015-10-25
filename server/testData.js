var db = require('./db');

db.createUser({
  username: "makersquare18",
  info: {
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
    "billingAddress": "asdfhjkasdfhasdl"
  }
});

db.createMerchant({
  merchantName: "starbucks",
  info: {
    name: "starbucks"
  },
  items: [
  // {
  //   name: "Latte",
  //   price: 3.25,
  //   description: "Delicious latte"
  // },
  // {
  //   name: "better Latte",
  //   price: 6.00,
  //   description: "Delicious latte"
  // },
  ]
});

var newPreferenceUsername = "makersquare18";
newPreferenceMerchantId = "starbucks";
var newPreferenceItemId = 1;
var newPreferenceIndex = db.users[newPreferenceUsername].preferences.push({
  merchantId: newPreferenceMerchantId,
  itemId: newPreferenceItemId
});

var newPreferenceUsername = "makersquare18";
newPreferenceMerchantId = "starbucks";
var newPreferenceItemId = 0;
var newPreferenceIndex = db.users[newPreferenceUsername].preferences.push({
  merchantId: newPreferenceMerchantId,
  itemId: newPreferenceItemId
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

console.log(db.itemsTable);
console.log(db.merchants["starbucks"].items);
