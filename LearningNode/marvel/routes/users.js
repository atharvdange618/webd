// Import necessary modules
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource'); // This route just sends a response when accessed
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nodepractice");
// The above line establishes a connection to a MongoDB server running on the local machine at port 27017.
// It assumes a database named "nodepractice" is present; if not, MongoDB will create it.

// Create a schema for the user
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
});
// This defines the structure of a user document in MongoDB. 
// It specifies that each user will have a username, name, and age, all with different data types.

// Create a model for the user
const User = mongoose.model("User", userSchema);
// This line creates a model named "User" based on the userSchema.
// Models allow you to interact with MongoDB collections in a structured way.
// The "User" model can be used to perform CRUD operations on the "User" collection.

module.exports = User;
// Export the "User" model so that it can be accessed and used in other parts of your application.
