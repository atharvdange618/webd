var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get('/', function (req, res) {
  req.session.ban = true;
  res.cookie("age", 25);
  res.render('index', { title: 'Express' });
});

router.get('/read', function (req, res) {
  console.log(req.cookies.age);
  res.send("check your cookies");
});

router.get('/deletecookies', function (req, res) {
  res.clearCookie("age");
  res.send("cookies deleted");
});

router.get('/create', async function (req, res) {
  const createdUser = await userModel.create({
    username: "Atharvdange._",
    name: "Atharv",
    age: 21
  });
  res.send(createdUser);
});

router.get('/allusers', async function (req, res) {
  let allUsers = await userModel.find();
  res.send(allUsers);
});

router.get('/user', async function (req, res) {
  let user = await userModel.findOne({
    username: "Atharvdange._"
  });
  res.send(user);
});

router.get('/delete', async function (req, res) {
  let deleteUser = await userModel.findOneAndDelete({
    username: "Atharvdange._"
  });
  res.send(deleteUser);
});

router.get('/checkban', function (req, res) {
  if (req.session.ban === true) { // Change "res.session" to "req.session"
    res.send("You are banned");
  } else {
    res.send("You are not banned");
  }
});

router.get('/removeban', function (req, res) {
  req.session.destroy(function (err) {
    console.log(err);
    res.send("You are unbanned");
  });
});

module.exports = router;
