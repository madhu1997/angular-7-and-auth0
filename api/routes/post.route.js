const express = require('express');
const app = express();
const postRoutes = express.Router();

// Require post model in our routes module
let Post = require('../models/Post');
const authRoute = require('../auth0/auth.route');


// Defined store route
postRoutes.route('/add').post(authRoute.checkJwt,authRoute.handleUser, function (req, res) {
  let post = new Post(req.body);
  //console.log(post);
  post.created_by_id = req.currentUser.id;
  post.created_by_name = req.currentUser.nickname;
  console.log(post.created_by_name);
  //console.log(post.created_by_id);
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

postRoutes.route('/get').get(authRoute.handleUser,function (req, res) {
  user = req.currentUser.id
  //console.log(user);
  Post.find({created_by_id:user}, function (err, post){
      res.json(post);
      //console.log(post);
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