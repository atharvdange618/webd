const { getUser } = require('../service/auth')

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies.uid;

    if (!userUid) return res.redirect('/user/login');
    const user = getUser(userUid);

    if (!user) return res.redirect('/user/login');

    res.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly
}