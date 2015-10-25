var express = require('express');
var config = require('./config');
var paypalConfig = require('./paypal/paypalConfig');
var bodyParser = require('body-parser');
var routeHandlers = require('./routeHandlers');
var paypal = require('./paypal');
var db = require('./db');
var app = express();

app.use(bodyParser.json());
app.disable('etag');

app.use(express.static("../client/app"));

// Paypal Auth Routes
app.get('/login/paypal/:merchantId', paypal.obtainConsent);
app.get('/auth/paypal', paypal.captureAuthorizationCode, routeHandlers.paypalAuth);

// Payment
app.post('/api/payment', routeHandlers.createUserPayment);

// User Management Routes
app.post('/api/merchant', routeHandlers.createMerchant);
app.post('/api/merchant/item', routeHandlers.createMerchantItem);
app.post('/api/user', routeHandlers.createUser);
app.post('/api/user/item', routeHandlers.createUserPreference);
app.get('/api/items', routeHandlers.getAllItems);
// app.get('/api/user/:username/items', routeHandlers.getUserPreferences);
app.get('/api/user/:username', routeHandlers.getUserPreferences);
app.get('/api/merchant/:merchantname', routeHandlers.getMerchantItem);

app.listen(config.port, function() {
  paypal.authenticateServer(paypalConfig.CLIENT_ID, paypalConfig.SECRET)
  .then(function(auth) {
    db.paypalServerAuth.token = auth.access_token;
    db.paypalServerAuth.expiresIn = auth.expires_in;
    console.log('Server is authenticated and listening on: ', config.port);
    var testData = require('./testData');
  });
});
