// For assigning ids to posts
let uniqid = require('uniqid');
let Post = require('../models/posts').Post;
let express = require('express');
// helps to redirect requests to a file
let router = express.Router();

router.get('/', async (req,resp) => {
    let posts = await Post.find();
    resp.send(posts);
});

router.get('/:id', async (req,resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
});

router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let imgPath;
    if (reqBody.imageURL){
        imgPath = reqBody.imageURL
    } else {
        imgPath = req.file.path.replace('public', '');
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        author: reqBody.author,
        genre: reqBody.genre,
        description: reqBody.description,
        text: reqBody.text,
        imageURL: imgPath
    });

    await newPost.save();
    resp.send('created!');

});

router.delete('/:id', async (req, res)=>{
    let id = req.params.id;
    await Post.deleteOne({id: id});
    res.send('Deleted');
})

router.put('/:id', async (req, resp)=>{
   let id = req.params.id;
    let imgPath;
    if (req.body.imageURL){
        imgPath = req.body.imageURL
    } else {
        imgPath = req.file.path.replace('public', '');
    }

   let reqBody = {
       title: req.body.title,
       author: req.body.author,
       genre: req.body.genre,
       description: req.body.description,
       text: req.body.text,
       imageURL: imgPath
   };

   await Post.updateOne({id: id}, reqBody);
   resp.send('Updated');
});


module.exports = router;
