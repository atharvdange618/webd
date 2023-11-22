var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allposts', async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "655cf5c58a1e8e1c8193af51" })
    .populate("posts");
  res.send(user);
});

router.get('/createuser', async function (req, res, next) {
  const createdUser = await userModel.create({
    username: "mrunal",
    password: "Deadpool",
    posts: [],
    email: "mrunaldange618@gmail.com",
    fullName: "mrunal Vijayrao Dange"
  });

  res.send(createdUser);
});

router.get('/createpost', async function (req, res, next) {
  const createdPost = await postModel.create({
    postText: "Ram Ram bhai Saryane !",
    user: "655cf5c58a1e8e1c8193af51"
  });
  let user = await userModel.findOne({ _id: "655cf5c58a1e8e1c8193af51" });
  user.posts.push(createdPost._id);
  await user.save();
  res.send("Done");
});

module.exports = router;