const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    dob: Date,
    password: {
        type: String,
        required: true
    },
    bio: String,
    posts: Array
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;