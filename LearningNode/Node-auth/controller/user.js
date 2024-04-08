const UserModel = require('../model/user')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../service/auth')

async function handleUserSignup(req, res) {
    const { username, password, email } = req.body
    // Create a new user
    const user = await UserModel.create({
        user: username,
        password: password,
        email: email
    });

    return res.status(201).redirect("/user");
}

async function handleUserLogin(req, res) {
    const { password, email } = req.body
    // Create a new user
    const user = await UserModel.findOne({
        password,
        email
    });

    if (!user) return res.redirect("/user/login")

    const sessionID = uuidv4()
    setUser(sessionID, user)
    res.cookie("uid", sessionID)
    return res.status(200).redirect("/user");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}