const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')

mongoose.connect('mongodb://localhost:27017/blog_project');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts: blogposts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id);
        res.render('post', { blogpost });
    } catch (error) {
        console.log(error);
        res.status(404).send('Post not found');
    }
})


app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image;
        await image.mv(path.resolve(__dirname, 'public/assets/img', image.name));
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error uploading the file.');
    }
});



app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})
