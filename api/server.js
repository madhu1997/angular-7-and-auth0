const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

    const postRoute = require('./routes/post.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        res.setHeader('Access-Control-Allow-Headers', "X-Requested-with,content-type");
        res.setHeader('Access-Control-Allow-Credentials',true);
        next();
    })

    //app.use(cors());
    app.use('/post', postRoute);
    
    const port = 4000;
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });

