var express = require('express');
const { route } = require('../app');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", (req, res) => {
  res.render('login')
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send("Wrong Email or Password")
    }
    req.login(user, () => {
      res.send("You are authenticated")
    })
  })(req, res, next)
})

router.get("/secret", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are authorized to see this private page")
  } else {
    res.status(403).send("Access Denied")
  }
})

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.redirect("/");
    });
  });
});

module.exports = router;