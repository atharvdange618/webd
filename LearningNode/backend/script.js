const express = require('express');
const app = express();

app.use("/", function (req, res, next) {
    console.log("You have reached at the middleware and will be forwarded to the next handler");
    next();
})

app.get("/", function (req, res) {
    res.send("The server is available now ");
})

//to make routes dynamic we use : route
app.get("/profile/:username", function (req, res) {
    res.send(`Hello from ${req.params.username}`);
})

app.listen(3000);