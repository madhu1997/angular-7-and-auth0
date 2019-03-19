const express = require('express');
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

  const getPost  = function(req, res, next) {
    //console.log('Request URL:', req.params.postId)
    req.postId = req.params.postId;
    next()
  }  
  
  
  
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(cors());
  
  
  //const checkScopes = jwtAuthz([ 'read:users' ]);
  
  /*auth0.userInfo( handleUser, (req, res) => {
    console.log(req.users.user_id);
  });*/
  
  app.use('/post', postRoute);
  app.use('/post/:postId/comment', getPost, commentRoute);
  //app.use('/user',userRoute);
  const port = 4000;
  
  const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  });