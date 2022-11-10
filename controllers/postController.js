const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');


const post_all = async(req, res) => {
    try {
        result = await Post.find();
        res.status(200).json({
            success: true,
            data: result
        });
        console.log('All posts fetched successfully');

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

const post_create = async(req, res) => {
    console.log(req.body);
    now = Date.now();
    
    // To check if the logged user is making the post
    if (req.username != req.body.created_by) return res.status(403).json({
        success: false,
        message: 'The user accessing the token not same as the post creator'
    })

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        created_by: req.body.created_by,
        uploaded_on: now
    });

    try {
        result = await post.save();
        console.log('Post saved');
        res.status(201).json({
            success: true,
            data: result
        });

    } catch(error) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const post_update = async(req, res) => {
    const username = req.username
    const postid = req.params.postid;

    try {
        data = await Post.findOneAndUpdate(
            {_id: postid},
            {$set: req.body})
        console.log('Post has been updated');
        res.status(200).json({
            success: true
        });

    } catch (error) {
        res.status(404).json({
                success: false,
                message: error.message
        })
    }    
}

const post_vote = async(req, res) => {
    const postid = req.params.postid;

    try {
        data = await Post.findOneAndUpdate(
            {_id: postid},
            {$inc: {likes: 1}});
        res.status(200).json({
            success: true,
            message: 'You have voted on the post'
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }    
}

const post_del = async(req, res) => {
    // Login to authenticate a user and check if postid belongs to user
    const postid = req.params.postid;

    try {
        data = await Post.findOneAndDelete({_id: postid});
        console.log('Post deleted');
        res.status(200).json({
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {    
    post_all,
    post_create,
    post_update,
    post_vote,
    post_del
};