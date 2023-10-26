const express = require('express');
const app = express();

app.set("view engine", "ejs");

// app.use("/", function (req, res, next) {
//     console.log("You have reached at the middleware and will be forwarded to the next handler");
//     next();
// })

app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/contact", function (req, res) {
    res.render("contact", { name: "babdigang" });
})

app.get("/home", function (req, res) {
    res.send("Welcome to the home page");
})

//to make routes dynamic we use : where we want the route to be dynamically loaded
//and to access the route's parameters we use req.params
app.get("/profile/:username", function (req, res) {
    res.send(`Hello from ${req.params.username}`);
})

app.listen(3000);