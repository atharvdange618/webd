const express = require('express');
const session = require('express-session');

const app = express();

// Set up the session middleware
app.use(session({
    secret: 'secretkey', // A secret key for session data encryption
    resave: false, // Don't save the session if it hasn't changed
    saveUninitialized: true, // Save a new session with no data
}));

/* Home Page */
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Creating and accessing session data
app.get('/setSession', (req, res) => {
    req.session.username = 'Atharvdange._'; // Setting a session variable
    res.send('Session data set.');
});

app.get('/getSession', (req, res) => {
    const username = req.session.username; // Accessing a session variable
    res.send('Username from session: ' + username);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
