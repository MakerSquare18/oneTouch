/*merchant: {
  items: []

}*/

  // user: {
  //   // username: username
  //   preferences: [ 
  //     {
  //       merchantId: merchantId,
  //       itemId: itemId,
  //        pricce: price
  //     }
  //   ]
  // }

  // merchant: {
  //   auth: {
  //     bearer:,
  //     refresh,
  //   },
  //   info: {},
  //   items: [
  //     name:,
  //     price:,
  //   ],
  // }
 

// var User = function(userObj) {
//   username: userObj.username,
//   preferences: []
// }


var db = {
  paypalServerAuth: {
    token: null,
    expiresIn: null,
  },
  users: {},
  merchants: {},
};

var getMerchantById = function(merchantId) {
  
};

/*
 * Require userId 
 */
var getUserPreferences = function(username, itemId) {
  var _merchants = this.merchants;
  for (var _merchant in _merchants) {
    _merchants[_merchants].items[itemId];
  }
};

db.getUserPreferences = getUserPreferences;

module.exports = db;