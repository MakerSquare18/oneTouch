var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var routeHandlers = require('./routeHandlers');
var paypal = require('./paypal');
var db = require('./db');
var app = express();

app.use(bodyParser.json());

// Paypal Auth Routes
app.get('/login/paypal/:merchantId', paypal.obtainConsent);
app.get('/auth/paypal', paypal.captureAuthorizationCode, routeHandlers.paypalAuth);

// User Management Routes
app.post('/merchant', routeHandlers.createMerchant);
app.post('/merchant/item', routeHandlers.createMerchantItem);
app.post('/user', routeHandlers.createUser);
app.post('/user/item', routeHandlers.createUserPreference);
app.get('/items', routeHandlers.getAllItems);
app.get('/user/:username/items', routeHandlers.getUserPreferences);

app.listen(config.port, function() {
  paypal.authenticateServer()
  .then(function(auth) {
    db.paypalServerAuth.token = auth.access_token;
    db.paypalServerAuth.expiresIn = auth.expires_in;
  });
  console.log('Server is listening on: ', config.port);
});