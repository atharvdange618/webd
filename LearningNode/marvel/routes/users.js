var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

mongoose.connect("mongodb://127.0.0.1:27017/nodepractice");


