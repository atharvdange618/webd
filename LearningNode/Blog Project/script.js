const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://localhost:27017/blog_project');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
        .then(blogpost => {
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
        });
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})
