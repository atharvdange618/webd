const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Set up the cookie parser middleware
app.use(cookieParser());

/* Home Page */
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Setting a cookie
app.get('/setCookie', (req, res) => {
    res.cookie('username', 'Atharv_Dange', { maxAge: 900000, httpOnly: true }); // Setting a cookie named 'username'
    res.send('Cookie set.');
});

// Reading a cookie
app.get('/getCookie', (req, res) => {
    const username = req.cookies.username; // Accessing the 'username' cookie
    res.send('Username from cookie: ' + username);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
