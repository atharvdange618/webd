const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/endgame");

const userSchema = mongoose.Schema({
  username: String,
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
})

module.exports = mongoose.model("user", userSchema);