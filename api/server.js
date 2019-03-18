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
  const getPost  = function(req, res, next) {
    //console.log('Request URL:', req.params.postId)
    req.postId = req.params.postId;
    next()
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

  const handleUser = function(req, res, next) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    if (req.headers.authorization) {
      var token = req.headers.authorization.split(" ")[1];
    
      console.log(token);
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    next();
  }
    app.use('/post', handleUser, postRoute);
    app.use('/post/:postId/comment',getPost, commentRoute);
    //app.use('/user',userRoute);
    const port = 4000;
    
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });