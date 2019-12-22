let express = require('express');
let app = express();
let mongoose = require('mongoose');
// allows us to redirect requests to another file
let postRouter = require('./routes/posts');
//multer is used for receiving files from the front end
let multer = require('multer');


mongoose.connect('mongodb://localhost/Lagos', { useNewUrlParser: true });
// Convert to JSON format, so we can receive data in JSON format
app.use(express.json());
//specify the key of the file to be uploaded and the destination to save the file
let imageStorage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, 'public/images'),
   filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({storage: imageStorage}).single('imageFile'));



//for viewing files in public
app.use(express.static('public'));

// allows us to redirect requests to another file
app.use('/posts', postRouter);

app.listen(3000, ()=> console.log('Listening 3000...'))
