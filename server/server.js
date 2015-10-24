var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var routeHandlers = require('./routeHandlers');
var app = express();

app.use(bodyParser.json());

app.post('/merchant', routeHandlers.createMerchant);
app.post('/merchant/item', routeHandlers.createMerchantItem);
app.post('/user', routeHandlers.createUser);
app.post('/user/item', routeHandlers.createUserPreference);
app.get('/items', routeHandlers.getAllItems);
app.get('/user/:username/items', routeHandlers.getUserPreferences);

app.listen(config.port, function() {
  console.log('Server is listening on: ', config.port);
});