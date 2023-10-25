var oneLinerJoke = require('one-liner-joke');

// console.log(oneLinerJoke.getRandomJoke());

var figlet = require("figlet");

// figlet("Hello World !!", function (err, data) {
//     if (err) {
//         console.log("Something went wrong...");
//         console.dir(err);
//         return;
//     }
//     console.log(data);
// });

const express = require('express')
const app = express()

// This code creates an ExpressJS server
app.get('/', function (req, res) {
    // This code is the callback for the GET request
    res.send(oneLinerJoke.getRandomJoke())
    // This code sends the response of the GET request
})

app.listen(3000)

//we are always on the '/' route by default on any website we visit