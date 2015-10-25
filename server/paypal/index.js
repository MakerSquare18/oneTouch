var request = require('superagent');
var config = require('./paypalConfig');
var Promise = require('bluebird');


// Middleware function that redirects user to paypal login
function obtainConsent(req, res) {
  var merchantId = req.params.merchantId;
  var redirectURI = 'https://www.sandbox.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize'
  redirectURI += '?client_id=' + config.CLIENT_ID;
  redirectURI += '&response_type=code';
  redirectURI += '&scope=openid';
  redirectURI += '&redirect_uri=' + encodeURIComponent(config.REDIRECT_URI);
  redirectURI += '&state=' + merchantId;
  res.redirect(redirectURI);
}

// Middleware function that captures authorization code from paypal login redirect and stores it
// on req object as req.paypalAuthorizationCode so it can be accessed in subsequent middleware.
function captureAuthorizationCode(req, res, next) {
  req.paypalAuthorizationCode = req.query.code;
  req.merchantId = req.query.state;
  next();
};

// Accepts an authorization code obtained from a user login and uses it to obtain a bearer token
// So that API calls can be made on the users behalf. Returns a promise so .then(bearerToken)
// can bec called on it.
function requestAuthorizationToken(authorizationCode) {
  // Return a promise so it .then(bearerToken) can be chained
  return new Promise(function(resolve, reject) {
    request.get(config.ENDPOINT + '/v1/identity/openidconnect/tokenservice')
      .auth(config.CLIENT_ID, config.SECRET)
      .query({grant_type: 'authorization_code'})
      .query({code: authorizationCode})
      .query({redirect_uri: config.REDIRECT_URI})
      .end(function(err, response) {
        // Contains the following properties:
          // 1. expires_in: number of seconds until token is no longer valid
          // 2. access_token: bearer token for making API calls
          // 3. refresh_token: token used to refresh bearer token when it expires
          // 4. id_token: No idea what this is for
        resolve(response.body);
      });
  });
};

// Accepts a previously obtained refresh token (you get one of these everytime you get an access/bearer token)
// and returns a new access token / refresh token combination. Basically since access tokens expire, we use this
// function to get new ones on a regular basis.
function requestRefreshToken(refreshToken) {
  return new Promise(function(resolve, reject) {
    request.get(config.ENDPOINT + '/v1/identity/openidconnect/tokenservice')
      .auth(config.CLIENT_ID, config.SECRET)
      .query({grant_type: "refresh_token"})
      .query({refresh_token: refreshToken})
      .end(function(err, response) {
        resolve(response.body);
      });
  });
};

// Incomplete
function makePayment(accessToken, payer, price) {
  return new Promise(function(resolve, reject) {
    request.post(config.ENDPOINT + '/v1/payments/payment')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({intent: 'sale'})
    .send({payer: payer})
    // Only supports one transaction right now
    .send({transactions: [
      {amount: {
        total: price,
        currency: "USD"
      }}
    ]})
    .end(function(err, response) {
      if (err) console.log(err);
      resolve(response.body);
    })
  });
};

// Gets a token for the server account - not on behalf of another user
// Need these for credit card vault
function authenticateServer(clientId, secret) {
  // Return a promise so it .then(bearerToken) can be chained
  return new Promise(function(resolve, reject) {
    request.post(config.ENDPOINT + '/v1/oauth2/token')
      .set('Accept', 'application/json')
      .set('Accept-Langage', 'en_US')
      .auth(clientId, secret)
      .query({grant_type: 'client_credentials'})
        .end(function(err, response) {
        // Contains the following properties:
          // 1. expires_in: number of seconds until token is no longer valid
          // 2. access_token: bearer token for making API calls
          // 3. scope - what it can be used for?
          // 4. app_id
          // 5. token_type --- should be "Bearer"
        resolve(response.body);
      });
  });
}

function storeCreditCard(accessToken, payerId, creditCard){
  console.log(accessToken);
  return new Promise(function(resolve, reject) {
    request.post(config.ENDPOINT + '/v1/vault/credit-card')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ accessToken)
      .send({
        payer_id: payerId,
        type: creditCard.type || "visa",
        number: creditCard.number,
        cvv2: creditCard.cvv2,
        expire_month: creditCard.expirationMonth,
        expire_year: creditCard.expirationYear,
        first_name: creditCard.firstName,
        last_name: creditCard.lastName,
        billing_address: creditCard.billingAddress
      })
      .end(function(err, response) {
        if (err) console.log(err);
        resolve(response.body);
      });
  });
};

function retrieveCreditCard(accessToken, creditCardId){
  return new Promise(function(resolve, reject) {
    request.get(config.ENDPOINT + '/v1/vault/credit-card/' + creditCardId)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ accessToken)
      .end(function(err, response) {
        resolve(response.body);
      });
  });
};

exports.obtainConsent = obtainConsent;
exports.captureAuthorizationCode = captureAuthorizationCode;
exports.requestAuthorizationToken = requestAuthorizationToken;
exports.requestRefreshToken = requestRefreshToken;
exports.authenticateServer = authenticateServer;
exports.storeCreditCard = storeCreditCard;
exports.retrieveCreditCard = retrieveCreditCard;
exports.makePayment = makePayment;
