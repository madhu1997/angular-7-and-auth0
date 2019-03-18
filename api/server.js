const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const request = require("request");
const jwksRsa = require('jwks-rsa'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

    const postRoute = require('./routes/post.route');
    const commentRoute = require('./routes/comment.route');
    //const userRoute = require('./routes/user.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors());
  const getPost  = function(req, res, next) {
    //console.log('Request URL:', req.params.postId)
    req.postId = req.params.postId;
    next()
  }
  
 /* app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });

  const checkScopes = jwtAuthz([ 'read:users' ]);

  app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});*/

/*var options = { method: 'POST',
  url: 'https://dev-wyw2s199.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: 
   { 
     grant_type: 'client_credentials',
     client_id: 'FM8ECs5V8C5ETJpXqqzxF78WNBe612Dl',
     client_secret: 'VTFIDmRxrZPl8h1Zt0H_mYrP4WRV2ITk0Vb0xUsDOYvhQyyJ3jKX_igb4Z8FpdC4',
     audience: 'https://localhost:4200' 
    },
  json: true };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });*/

  const handleUser = function(req, res, next) {
   // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    if (req.headers.authorization) {
      var token = req.headers.authorization.split(" ")[1];
    
     // console.log(token);
    }
    //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    next();
  }
  const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-wyw2s199.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://localhost:4200',
    issuer: `https://dev-wyw2s199.auth0.com/`,
    algorithms: ['RS256']
  });
  const Jwt= checkJwt;
  console.log(Jwt);
  /*app.get('api/users', checkJwt, (req, res) => {
    let userIds = getUsersFromDB(); //Array of User IDs from MongoDB for example (to be used later)
    console.log('Auth0 Access Token', req.auth0AccessToken);
});*/
/*var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: 'https://dev-wyw2s199.auth0.com/',
  clientId: 'FM8ECs5V8C5ETJpXqqzxF78WNBe612Dl',
  clientSecret: 'VTFIDmRxrZPl8h1Zt0H_mYrP4WRV2ITk0Vb0xUsDOYvhQyyJ3jKX_igb4Z8FpdC4'
});


const access_token = checkJwt;

//console.log("ACCESSTOKEN:", access_token)

auth0.getProfile(access_token, function (err, userInfo) {
    if(err) {
        console.log("failed to retrieve profile", err)
    } else {
        const userId = JSON.parse(userInfo)['sub'];
        console.log(userId);
    }
});*/

/*let getUser = (accessToken, userid) => {
  return requestPromise({
      url: `https://dev-wyw2s199.auth0.com/api/v2/users/${userid}`,
      headers: {
          'authorization': `Bearer ${accessToken}`
      }
  });
}*/

    app.use('/post', handleUser, postRoute);
    app.use('/post/:postId/comment',getPost, commentRoute);
    //app.use('/user',userRoute);
    const port = 4000;
    
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });