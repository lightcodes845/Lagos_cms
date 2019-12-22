let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
   name: String,
   time: Date,
   body: String,
   likes: Number,
   dislikes: Number
});

let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    author: String,
    genre: String,
    description: String,
    text: String,
    imageURL: String,
    comments: [commentSchema]
});

let Post = mongoose.model('Post', postSchema);

module.exports = { Post: Post }
