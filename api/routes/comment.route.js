const express = require('express');
const app = express();
const commentRoutes = express.Router();

// Require post model in our routes module
let Comment = require('../models/Comment');

// Defined store route
commentRoutes.route('/add').post(function (req, res) {
  let comment = new Comment(req.body);
  comment.post = req.postId;
  comment.save()
    .then(comment => {
      res.status(200).json({'comment': 'comment in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
commentRoutes.route('/').get(function (req, res) {
  postId = req.postId;
  Comment.find({post: postId}, function (err, comments){
    if(err){
      console.log(err);
      
    }
    else {
      res.json(comments);
    }
  });
});

// Defined edit route
commentRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Comment.findById(id, function (err, comment){
      res.json(comment);
      console.log(comment);
  });
});

//  Defined update route
commentRoutes.route('/update/:id').post(function (req, res,next) {
    console.log(req.params.id);
    console.log(req.body.comment);
    Comment.findById(req.params.id, function(err, comment) {
    if (!comment)
      return next(new Error('Could not load Document'));
    else {
        comment.comment = req.body.comment;
        comment.save().then(comment => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
// Defined delete | remove | destroy route
commentRoutes.route('/delete/:id').get(function (req, res) {
  console.log(req.params.id);
  //postId = req.postId;
  Comment.findByIdAndRemove({_id:req.params.id}, function(err, comment){
      //console.log(comment)
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = commentRoutes;