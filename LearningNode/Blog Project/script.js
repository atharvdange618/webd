const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const newPostController = require('./controller/newPost.js')
const aboutController = require('./controller/about.js');
const contactController = require('./controller/contact.js');
const postController = require('./controller/post.js');
const homeController = require('./controller/home.js');
const getPostController = require('./controller/getPost.js');
const storePostController = require('./controller/storePost.js');
const validateMiddleware = require('./middleware/validationMiddleware.js');

mongoose.connect('mongodb://localhost:27017/blog_project');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/posts/store', validateMiddleware);

app.get('/', homeController)

app.get('/about', aboutController)

app.get('/post', postController)

app.get('/contact', contactController)

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);



app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})
