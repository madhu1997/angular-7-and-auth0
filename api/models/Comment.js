const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Comment = new Schema({
    post:{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    },
    comment: {
    type: String
  }
},{
    collection: 'comment'
});

module.exports = mongoose.model('Comment', Comment);