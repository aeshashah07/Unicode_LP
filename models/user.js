const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email is Invalid!");
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    dob: Date,
    password: {
        type: String,
        required: true
    },
    bio: String,
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed_pass = await bcrypt.hash(this.password, salt)
        this.password = hashed_pass
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;