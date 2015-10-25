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
  //     external_items_key: items[key]
  //   },
  //     {
  //
  //     }
  //   ],
  // }

  // id autoIncremental
  // itemTable : [{
  //   merchantId: "starbucks",      // itemTableArrayIndex
  //   merchantItemId: connectionKey
  // }]
  //

var db = {
  paypalServerAuth: {
    token: null,
    expiresIn: null,
  },
  users: {},
  merchants: {},
  itemsTable: []
};

// var createUser = function(userInfo, callback) { shall we make it async?
var createUser = function(userObj) {
  if (db.users[userObj.username] !== undefined) {
    return Error("" + userObj.username + "exists!!");
  }
  userObj.preferences = [];
  db.users[userObj.username] = userObj;
}

// input username
var createUserPreference = function(preferenceObj) {
  var _username = preferenceObj.username;
  console.log(preferenceObj);
  db.users[_username].preferences.push({
    merchantId: preferenceObj.merchantId,
    itemId: preferenceObj.itemId //g_itemId in itemsTable
  });

  if (db.users[_username] === undefined) {
    return Error("" + _username + " does not exist!!");
  }
};

var createMerchant = function(merchantObj) {
  if (db.merchants[merchantObj.merchantName] !== undefined) {
    return Error("" + merchantObj.merchantName + "exists!!");
  }
  merchantObj.auth ={
    token: null,
    expiresIn: null
  };
  merchantObj.items = merchantObj.items || [];
  db.merchants[merchantObj.merchantName] = merchantObj;
}

// update merchant table global key and item global table merchant localkey
var createMerchantItem = function(itemObj) {
  itemObj._g_itemId = db.itemsTable.length;
  var _merchantItemId = db.merchants[itemObj.merchantId].items.push(itemObj);
  db.itemsTable.push({
    merchantItemId: _merchantItemId - 1,
    merchantId: itemObj.merchantId
  });
  return itemObj._g_itemId;
}

// return user obj
var getUserByName = function(username) {
  if (db.users[username] !== undefined) { return db[username]; }
  return Error("" + "could not find user: " + username);
}

var getIteminfoByUserPreference = function(itemId, username) {
  var _preferences = db.users[username].preferences;
  _preferences.forEach(function(preference) {
    if (preference[itemId] === itemId) {
      return preference[merchantId].merchantId.items[itemId];
    }
  })
  return Error("" + itemId + "by user: " + username + "could not be found");
}

var getMerchantItemInfoFromTableId = function(g_itemId) {
  var _g_itemId = parseInt(g_itemId)
  var _merchantId = db.itemsTable[_g_itemId].merchantId;
  var _itemId = db.itemsTable[g_itemId].merchantItemId;

  return db.merchants[_merchantId].items[_itemId];
}

// input g_itemId in itemsTable
var getUserPrefListByUsername = function(username) {
  var userInfoMixin = {};
  var fullPreferenceList = {};
  var preferenceMixin = [];
  var _merchantId, _itemId, _itemInfo;

  db.users[username].preferences.forEach(function(preference) {
    _merchantId = preference.merchantId;
    _g_itemId = preference.itemId;

    _itemInfo = getMerchantItemInfoFromTableId(_g_itemId);
    // query junction table with g_itemOd to find merchant private itemId
    preferenceMixin.push({
      // db.merchants[_merchantId].
      itemInfo: _itemInfo,
      itemId: _g_itemId,
      merchantId: _merchantId
    });
  });

  userInfoMixin["username"] = username;
  userInfoMixin["profileImg"] = db.users[username].profileImg;
  userInfoMixin.preferences = preferenceMixin;
  return userInfoMixin;
}

var getMixinPrefListByUsername = function(username) {
  var userInfoMixin = {};
  var preferenceMixin = [];
  var _merchantId, _itemId;
  db.users[username].preferences.forEach(function(preference) {
    _merchantId = preference.merchantId;
    _itemId = preference.itemId;
    preferenceMixin.push({
      // db.merchants[_merchantId].
      itemInfo: db.merchants[_merchantId].items[_itemId],
      itemId: _itemId,
      merchantId: db.merchants[_merchantId].merchantName
    });
  });

  userInfoMixin["username"] = username;
  userInfoMixin["profileImg"] = db.users[username].profileImg;
  userInfoMixin.preferences = preferenceMixin;
  return userInfoMixin;
}

var getAllItems = function() {
  var allItems = [];
  var _merchantId, _itemId;
  db.itemsTable.forEach(function(itemInTable) {
    _merchantId = itemInTable.merchantId;
    _itemId = itemInTable.merchantItemId;
    allItems.push(db.merchants[_merchantId].items[_itemId])
  });
  return allItems;
}

var getMerchantItem = function(merchantId) {
  return db.merchants[merchantId].items;
}

db.createUser = createUser;
db.createMerchant = createMerchant;
db.createMerchantItem = createMerchantItem;
db.createUserPreference = createUserPreference;
db.getIteminfoByUserPreference = getIteminfoByUserPreference;
db.getUserByName = getUserByName;
// db.getMixinPrefListByUsername = getMixinPrefListByUsername;
db.getUserPrefListByUsername = getUserPrefListByUsername;
db.getAllItems = getAllItems;
db.getMerchantItem = getMerchantItem;

module.exports = db;
