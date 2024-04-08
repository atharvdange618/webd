const mongoose = require('mongoose')

async function connectToDb(url) {
    return await mongoose.connect(url);
}

module.exports = connectToDb