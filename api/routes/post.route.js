const express = require('express');
const app = express();
const postRoutes = express.Router();

// Require post model in our routes module
let post = require('../models/post');

// Defined store route
postRoutes.route('/add').post(function (req, res) {
  let post = new post(req.body);
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
    post.find(function (err, postes){
    if(err){
      console.log(err);
    }
    else {
      res.json(postes);
    }
  });
});

// Defined edit route
postRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  post.findById(id, function (err, post){
      res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').post(function (req, res) {
    post.findById(req.params.id, function(err, next, post) {
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
    post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = postRoutes;