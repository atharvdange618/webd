var express = require('express');
var router = express.Router();

const userModel = require('./users');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/failed', function (req, res) {
  req.flash("age", 12);
  req.flash("name", "atharv");
  res.send('bangaya bhaii');
});

router.get('/checkkaro', function (req, res) {
  console.log(req.flash('age'), req.flash('name'));
  res.send("check karlo be ke terminal pe");
});

router.get('/create', async function (req, res) {
  let userData = await userModel.create({
    username: "Haru2003",
    nickname: "kpopfan",
    description: "A avid dancer and actor, cheerful soul",
    categories: ['dance', 'acting', 'kpop music']
  });
  res.send(userData);
});

//to find all set of values
router.get('/find', async function (req, res) {
  var regex = new RegExp("atharv", 'i')
  let user = await userModel.find({ username: regex });
  res.send(user);
});

//to find docs with a specific date range
router.get('/finddate', async function (req, res) {
  var date1 = new Date("2024-01-23");
  var date2 = new Date("2024-01-24");
  let user = await userModel.find({ dateCreated: { $gte: date1, $lte: date2 } });
  res.send(user);
})

//find docs based on the existence of the field
router.get('/findfield', function (req, res) {
  
});

module.exports = router;