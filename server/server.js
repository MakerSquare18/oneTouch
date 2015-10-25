var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var routeHandlers = require('./routeHandlers');
var paypal = require('./paypal');
var db = require('./db');
var testData = require('./testData');
var app = express();

app.use(bodyParser.json());

// Paypal Auth Routes
app.get('/api/login/paypal/:merchantId', paypal.obtainConsent);
app.get('/api/auth/paypal', paypal.captureAuthorizationCode, routeHandlers.paypalAuth);

// Payment
// app.post('//api/payment/:username', routeHandlers.createUserPayment);

// User Management Routes
app.post('/api/merchant', routeHandlers.createMerchant);
app.post('/api/merchant/item', routeHandlers.createMerchantItem);
app.post('/api/user', routeHandlers.createUser);
app.post('/api/user/item', routeHandlers.createUserPreference);
app.get('/api/items', routeHandlers.getAllItems);
// app.get('/api/user/:username/items', routeHandlers.getUserPreferences);
app.get('/api/user/:username', routeHandlers.getUserPreferences);


app.listen(config.port, function() {
  paypal.authenticateServer()
  .then(function(auth) {
    db.paypalServerAuth.token = auth.access_token;
    db.paypalServerAuth.expiresIn = auth.expires_in;
    console.log('Server is authenticated and listening on: ', config.port);
  });
});
