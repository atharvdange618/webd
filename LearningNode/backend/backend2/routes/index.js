var express = require('express');
var router = express.Router();
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userModel = require('./users');

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});

router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    })
    .catch(function (err) {
      console.error(err);
      res.redirect('/');
    });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

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
router.get('/findfield', async function (req, res) {
  let user = await userModel.find({ categories: { $exists: true } });
  res.send(user);
});

//find docs based on the specific field's length
router.get('/findlength', async function (req, res) {
  let user = await userModel.find({
    $expr: {
      $and: [
        {
          $gte: [{ $strLenCP: 'nickname' }, 2]
        },
        {
          $lte: [{ $strLenCP: 'nickname' }, 12]
        },
      ]
    }
  });
  res.send(user);
});

//logout functionality
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/')
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;