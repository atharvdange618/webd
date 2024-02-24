const express = require('express');
const app = express();

// Add a middleware to the app
app.use(function (req, res, next) {
    console.log("Middleware 1");
    next(); // Pass control to the next middleware
});

// Add another middleware to the app
app.use(function (req, res, next) {
    console.log("Middleware 2");
    next(); // Pass control to the next middleware
});

// Create a route for the app
app.get("/", function (req, res) {
    res.send("Hello, world!");
});

// Create another route for the app

app.get("/profile", function (req, res) {
    res.send("Hello, from profile!");
})

// Start the app
app.listen(3000);