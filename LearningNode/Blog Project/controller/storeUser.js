const User = require('../models/User.js')
const path = require('path')
const flash = require('connect-flash');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.flash('validationErrors', validationErrors)
        req.flash('data', req.body)
        return res.redirect('/auth/register');
    }
};