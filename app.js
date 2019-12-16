let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Post = require('./models/posts').Post;

mongoose.connect('mongodb://localhost/Lagos', { useNewUrlParser: true });
// Convert to JSON format, so we can receive data in JSON format
app.use(express.json());
let id = 1;

app.get('/posts', async (req,resp) => {
   let posts = await Post.find();
   resp.send(posts);
});

app.post('/posts', async (req,resp) => {
   let reqBody = req.body;
   let newPost = new Post({
      id: id++,
      title: reqBody.title,
      date: new Date(),
      author: reqBody.author,
      genre: reqBody.genre,
      description: reqBody.description,
      text: reqBody.text,
      imageURL: reqBody.imageURL
   });

   await newPost.save();
   resp.send('created!');

});

//for viewing files in public
app.use(express.static('public'));

app.listen(3000, ()=> console.log('Listening 3000...'))
