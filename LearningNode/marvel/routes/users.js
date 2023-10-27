var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

mongoose.connect("mongodb://127.0.0.1:27017/nodepractice");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
});

const User = mongoose.model("User", userSchema); // Define the model and store it in a variable

module.exports = User; // Export the User model