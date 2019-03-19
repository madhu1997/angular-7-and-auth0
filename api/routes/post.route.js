const express = require('express');
const app = express();
const postRoutes = express.Router();

// Require post model in our routes module
let Post = require('../models/Post');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const request = require("request");
const jwksRsa = require('jwks-rsa'),
path = require('path');


const AuthenticationClient = require('auth0').AuthenticationClient;
  
var auth0 = new AuthenticationClient({
  domain: 'dev-wyw2s199.auth0.com',
  clientId: 'FM8ECs5V8C5ETJpXqqzxF78WNBe612Dl',
  clientSecret: 'VTFIDmRxrZPl8h1Zt0H_mYrP4WRV2ITk0Vb0xUsDOYvhQyyJ3jKX_igb4Z8FpdC4'
});

const User = require('../models/User');


const checkJwt = jwt({
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


const handleUser = function(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    auth0.getProfile(token, function (err, userInfo) {
      if(err) {
        console.log("failed to retrieve profile", err)
      } else {
        req.currentUser = new User(userInfo);
        next();
      }
    });
  }
}

// Defined store route
postRoutes.route('/add').post(checkJwt, handleUser, function (req, res) {
  let post = new Post(req.body);
  post.created_by_id = req.currentUser.id;
  post.save()
    .then(post => {
      res.status(200).json({'post': 'post in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route('/').get(function (req, res) {
    Post.find(function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});
postRoutes.route('/get/:id').get(function (req, res) {
  let id = req.params.id;
  Post.findById(id, function (err, post){
      res.json(post);
});
});

postRoutes.route('/get').get(function (req, res) {
  user = req.currentUser.id
  Post.findById({created_by_id:user}, function (err, post){
      res.json(post);
});
});

// Defined edit route
postRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Post.findById(id, function (err, post){
      res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').post(function (req, res) {
    Post.findById(req.params.id, function(err,post,next) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
        post.title = req.body.title;
        post.description = req.body.description;

        post.save().then(post => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = postRoutes;