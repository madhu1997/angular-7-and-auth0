const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
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
    /*var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: "https://dev-wyw2s199.auth0.com/.well-known/jwks.json"
      }),
      audience: 'https://localhost:4200',
      issuer: "https://dev-wyw2s199.auth0.com/",
      algorithms: ['RS256']
  });
  app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});
let getAccessToken = (req, res, next) => {

  var AuthenticationClient = require('auth0').AuthenticationClient;

  var auth0 = new AuthenticationClient({
      domain: 'dev-wyw2s199.auth0.com',
      clientId: 'FM8ECs5V8C5ETJpXqqzxF78WNBe612Dl',
      clientSecret: 'VTFIDmRxrZPl8h1Zt0H_mYrP4WRV2ITk0Vb0xUsDOYvhQyyJ3jKX_igb4Z8FpdC4'
  });

  auth0.clientCredentialsGrant(
      {
      audience: `https://dev-wyw2s199.auth0.com/api/v2/`,
      scope: 'read:users'
      },
      function(err, response) {
      if (err) {
          res.status(500);
      }
      else{
          req.auth0AccessToken = response.access_token;
          return next();
      }
  });

}
api.get('/users', getAccessToken, (req, res) => {
  let userIds = getUsersFromDB(); //Array of User IDs from MongoDB for example (to be used later)
  console.log('Auth0 Access Token', req.auth0AccessToken);
});
let getUser = (accessToken, userid) => {
  return requestPromise({
      url: `https://dev-wyw2s199.auth0.com/api/v2/users/${userid}`,
      headers: {
          'authorization': `Bearer ${accessToken}`
      }
  });
}

let getUsers = (auth0AccessToken, userIds) => {
  return new Promise((resolve, reject) => {

      let auth0UserPromises = [];

      userIds.forEach(userId => {
          auth0UserPromises.push(getUser(auth0AccessToken, userId));
      });

      //Return all promises as success, even if auth0 could not find the user
      Promise.all(auth0UserPromises.map(p => p.catch(() => undefined))).then(auth0Users => {
                          
          var model = auth0Users.map(user => (
              email:user.email,
              username: user.username,
              app_metadata: user.app_metadata,
              nickname: user.nickname,
          ));
          resolve(model);
      });

  });
};
api.get('/users', getAccessToken, (req, res) => {
  let userIds = getUsersFromDB(); //Array of User IDs from MongoDB for example (to be used later)
  
  getUsers(req.auth0AccessToken, userIds).then(users => {
    res.json(users);  
  });
  
});*/

    app.use('/post', postRoute);
    app.use('post/id/comment',commentRoute);
    //app.use('/user',userRoute);
    const port = 4000;
    
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });

