const mongoose = require('mongoose');
const connectToDb = require('../connectDB');

connectToDb("mongodb://localhost:27017/practice")
    .then(() => {
        console.log("Connection established");
    }).catch((err) => {
        console.log(err.message);
    });

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
