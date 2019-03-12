const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Post = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  
},{
    collection: 'post'
});

module.exports = mongoose.model('post', Post);