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
  updated_at: {
    type:Date,
    default: Date.now
  },
  created_by: {
    type: Schema.Types.ObjectId, 
    ref: 'users'
  }
  
},{
    collection: 'post'
});

module.exports = mongoose.model('Post', Post);