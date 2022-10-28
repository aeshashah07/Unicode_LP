const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    uploaded_on: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0  
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;