const { handleUserSignup, handleUserLogin } = require('../controller/user');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    return res.render('index', { title: "Home" });
});

router.get('/signup', (req, res) => {
    return res.render('signup', { title: "Signup" });
});

router.post('/signup', handleUserSignup);

router.get('/login', (req, res) => {
    return res.render('login', { title: "login" });
});

router.post('/login', handleUserLogin);

module.exports = router;