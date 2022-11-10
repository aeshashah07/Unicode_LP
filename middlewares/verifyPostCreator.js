const Post = require('../models/post');

// To check if that user accessing the token is the creator of the post
async function verifyPostCreator(req, res, next) {
    const postid = req.params.postid;

    try {
        const post = await Post.findOne({_id: postid});
        console.log(post)
        if (req.username != post.created_by) return res.status(403).json({
            success: false,
            message: 'The user accessing the token not same as the post creator'
        })
    } catch (error) {
        console.log('Post does not exist');
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }

    next(); 
}

module.exports = verifyPostCreator;