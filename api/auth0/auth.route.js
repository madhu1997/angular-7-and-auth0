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


authRoute.checkJwt = function (req, res,next) {
  //console.log('babjbfskjbkj');
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
  next();
  //console.log();
}

authRoute.handleUser = function (req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    auth0.getProfile(token, function (err, userInfo) {
      if (err) {
        console.log("failed to retrieve profile", err)
      } else {
        req.currentUser = new User(userInfo);
        //console.log(userInfo);
        next();
        //console.log(req.currentUser.id);
      }
    });
  }
  
  
}

module.exports = authRoute;