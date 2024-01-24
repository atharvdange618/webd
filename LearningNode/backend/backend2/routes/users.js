const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/endgame");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);