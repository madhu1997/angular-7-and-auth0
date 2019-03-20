const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const request = require("request");
const jwksRsa = require('jwks-rsa'),
path = require('path');
const authRoute = express.Router();


const AuthenticationClient = require('auth0').AuthenticationClient;
  
var auth0 = new AuthenticationClient({
  domain: 'dev-wyw2s199.auth0.com',
  clientId: 'FM8ECs5V8C5ETJpXqqzxF78WNBe612Dl',
  clientSecret: 'VTFIDmRxrZPl8h1Zt0H_mYrP4WRV2ITk0Vb0xUsDOYvhQyyJ3jKX_igb4Z8FpdC4'
});

const User = require('../models/User');


authRoute.checkJwt(function(req,res) {
  console.log(babjbfskjbkj);
  jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-wyw2s199.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://localhost:4200/api',
  issuer: "https://dev-wyw2s199.auth0.com/",
  algorithms: ['RS256']
});
});
class Auth{
  constructor({token}) {
    this.token = token;
    console.log(this.token);

  auth0.getProfile(this.token, function (err, userInfo) {
    if(err) {
      console.log("failed to retrieve profile", err)
    } else {
      req.currentUser = new User(userInfo);
      next();
    }
  });
}
}

module.exports = authRoute;