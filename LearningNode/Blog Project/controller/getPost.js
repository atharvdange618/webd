const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate('userid');
        res.render('post', { blogpost });
    } catch (error) {
        console.log(error);
        res.status(404).send('Post not found');
    }
}