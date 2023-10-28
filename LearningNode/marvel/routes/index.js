// Import necessary modules
var express = require('express');
var router = express.Router();

// Import the "userModel" from the "users.js" module
const userModel = require("./users");

/* GET home page. */
router.get('/', function (req, res) {
  // Set a session variable "ban" to true
  req.session.ban = true;

  // Set a cookie named "age" with a value of 25
  res.cookie("age", 25);

  // Render the "index" view and pass the title "Express" to it
  res.render('index', { title: 'Express' });
});

// Route to read a cookie
router.get('/read', function (req, res) {
  // Log the value of the "age" cookie
  console.log(req.cookies.age);

  // Send a response to the client
  res.send("check your cookies");
});

// Route to delete the "age" cookie
router.get('/deletecookies', function (req, res) {
  // Clear the "age" cookie
  res.clearCookie("age");

  // Send a response to the client
  res.send("cookies deleted");
});

// Route to create a new user in the database
router.get('/create', async function (req, res) {
  const createdUser = await userModel.create({
    username: "Atharvdange._",
    name: "Atharv",
    age: 21
  });

  // Send the created user as a response
  res.send(createdUser);
});

// Route to fetch all users from the database
router.get('/allusers', async function (req, res) {
  let allUsers = await userModel.find();

  // Send all users as a response
  res.send(allUsers);
});

// Route to fetch a specific user from the database
router.get('/user', async function (req, res) {
  let user = await userModel.findOne({
    username: "Atharvdange._"
  });

  // Send the user as a response
  res.send(user);
});

// Route to delete a specific user from the database
router.get('/delete', async function (req, res) {
  let deleteUser = await userModel.findOneAndDelete({
    username: "Atharvdange._"
  });

  // Send the deleted user as a response
  res.send(deleteUser);
});

// Route to check if the user is banned based on the session variable
router.get('/checkban', function (req, res) {
  if (req.session.ban === true) {
    res.send("You are banned");
  } else {
    res.send("You are not banned");
  }
});

// Route to remove the ban by destroying the session
router.get('/removeban', function (req, res) {
  req.session.destroy(function (err) {
    console.log(err);
    res.send("You are unbanned");
  });
});

module.exports = router; // Export the router module for use in other parts of your application
