const express = require('express');
const app = express();

app.use(function (req, res, next) {
    console.log("Middleware 1");
    next(); // Pass control to the next middleware
});

app.use(function (req, res, next) {
    console.log("Middleware 2");
    next(); // Pass control to the next middleware
});

app.get("/", function (req, res) {
    res.send("Hello, world!");
});


app.get("/profile", function (req, res) {
    res.send("Hello, from profile!");
})

app.listen(3000);