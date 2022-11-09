const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');

const post_all = (req, res) => {
    Post.find()
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result
            });
            console.log('All posts fetched successfully');
        })
        .catch((error) => {
            console.log('------------------------------')
            console.log(error);
            res.status(404).json({
                success: false,
                message: error.message
            });
        })    
}

const post_create = (req, res) => {
    console.log(req.body);
    now = Date.now();
    // Login to get username
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        // Use the login username
        created_by: req.body.created_by,
        uploaded_on: now
    });

    post.save()
        .then((result) => {
            console.log('Post saved');
            res.status(201).json({
                success: true,
                data: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                success: false,
                message: err.message
            })
        });
}

const post_update = (req, res) => {
    // Login, and obtain username
    const username = req.params.username;
    const postid = req.params.postid;

    // Check if that user indeed does have post with that id
    Post.findOneAndUpdate(
        {_id: postid},
        {$set: req.body},
        (error) => {
            if (error) { 
                res.status(404).json({
                    success: false,
                    message: error.message
                })
            }
        }
    )
    console.log('Post has been updated');
    res.status(200).json({
        success: true
    });
}

const post_vote = (req, res) => {
    // Login, and check legitimacy of user
    const postid = req.params.postid;

    Post.findOneAndUpdate(
        {_id: postid},
        {$inc: {likes: 1}},
        (error) => {
            if (error) { 
                res.status(404).json({
                    success: false,
                    message: error.message
                })
            }
        }
    )
    res.status(200).json({
        success: true,
        message: 'You have voted on the post'
    });
}

const post_del = (req, res) => {
    // Login to authenticate a user and check if postid belongs to user
    const postid = mongoose.Types.ObjectId(req.params.postid);

    Post.findOneAndDelete({postid: postid})
        .then((result) => {
            console.log('Post deleted');
            res.status(200).json({
                success: true,
            });
            // res.json({ redirect: '/users'});
            res.redirect('/post/all');
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                success: false,
                message: error.message
            });
        })
}

module.exports = {    
    post_all,
    post_create,
    post_update,
    post_vote,
    post_del
};