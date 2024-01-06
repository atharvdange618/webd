//module imports
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

//controllers
const newPostController = require('./controller/newPost.js')
const aboutController = require('./controller/about.js');
const contactController = require('./controller/contact.js');
const postController = require('./controller/post.js');
const homeController = require('./controller/home.js');
const getPostController = require('./controller/getPost.js');
const storePostController = require('./controller/storePost.js');
const validateMiddleware = require('./middleware/validationMiddleware.js');
const newUserController = require('./controller/newUser');
const storeUserController = require('./controller/storeUser');
const loginController = require('./controller/login.js');
const loginUserController = require('./controller/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controller/logout');

mongoose.connect('mongodb://localhost:27017/blog_project');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(flash());

app.use(expressSession({
    secret: 'secretkey', // A secret key for session data encryption
    resave: false, // Don't save the session if it hasn't changed
    saveUninitialized: true, // Save a new session with no data
}));

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

//routes
app.get('/', homeController)

app.get('/about', aboutController)

app.get('/post', postController)

app.get('/contact', contactController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.use('/posts/store', validateMiddleware)

app.get('/auth/logout', logoutController)

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
})

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500');
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})