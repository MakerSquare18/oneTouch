  // user: {
  //   username: username ?
  //   preferences: [
  //     {
  //       merchantId: merchantId,
  //       itemId: itemId,
  //        pricce: price
  //     }
  //   ]
  //   profileImg
  // }

  // merchant: {
  //   auth: {
  //     bearer:,
  //     refresh,
  //   },
  //   info: {},
  //   items: [ {--- product list
  //     name:,
  //     price:,
  //     icon,   --- url string
  //     description --- string
  //   },
  //     {
  //
  //     }
  //   ],
  // }

var db = {
  paypalServerAuth: {
    token: null,
    expiresIn: null,
  },
  users: {},
  merchants: {},
};

// var createUser = function(userInfo, callback) { shall we make it async?
var createUser = function(userObj, callback) {
  if (users[userObj.username] !== undefined) {
    return Error("" + userObj.username + "exists!!");
  }
  users[userInfo.username] = userObj;
}

// return user obj
var getUserByName = function(username) {
  if (db.users[username] !== undefined) { return db[username]; }
  return Error("" + "could not find user: " + username);
}

var getItemIdByUserPreference = function(itemId, username) {
  var _preferences = db.users[username].preferences;
  _preferences.forEach(function(preference) {
    if (preference[itemId] === itemId) {
      return preference[merchantId].merchantId;
    }
  })
  return Error("" + itemId + "by user: " + username + "could not be found");
}

var getMixinPrefListByusername = function(username) {
  var userInfoMixin = {};
  var preferenceMixin = [];
  var _merchantId, _itemId;
  db.users[username].preferences.forEach(function(preference) {
    _merchantId = preference.merchantId;
    _itemId = preference.itemId;
    preferenceMixin.push({
      merchantId: _merchantId,
      itemList: db.merchant[_merchantId].items[itemId]
    });
  });

  userInfoMixin["username"] = username;
  userInfoMixin["profileImg"] = db.users[username].profileImg;
  return preferenceMixin;
}

db.createUser = createUser;
db.getItemIdByUserPreference = getItemIdByUserPreference;
db.getUserByName = getUserByName;
db.getMixinPrefListByUsername = getMixinPrefListByusername;

module.exports = db;
