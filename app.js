let express = require('express');
let app = express();

//for viewing files in public
app.use(express.static('public'));

app.listen(3000, ()=> console.log('Listening 3000...'))
