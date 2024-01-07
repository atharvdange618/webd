const path = require('path');
const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    try {
        let image = req.files.image;
        await image.mv(path.resolve(__dirname, '../public/assets/img', image.name));
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name,
            userid: req.session.userId
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error uploading the file.');
    }
}