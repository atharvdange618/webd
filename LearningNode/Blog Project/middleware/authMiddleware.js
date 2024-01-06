const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/');
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the user.');
    }
};
