/*merchant: {
  items: []

}*/

  // user: {
  //   // username: username
  //   preferences: [ 
  //     {
  //       merchantId: merchantId,
  //       itemId: itemId
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

module.exports = db;