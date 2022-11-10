const User = require('../models/user');

const user_all = async(req, res) => {
    try {
        result = await User.find();
        res.status(200).json({
            success: true,
            data: result
        });
        console.log('All users fetched successfully');

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
        console.log(error);
    }
    
}

const user_create = async(req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        password: req.body.password,
    });

    try {
        result = await user.save();
        console.log('User saved')
        res.status(201).json({
            success: true,
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const user_get = async(req, res) => {
    const username = req.params.username;

    try {
        user = await User.findOne({username : username});
        if (user) {
            // Can provide authentication; to view any profile, login
            res.status(200).json({
                success: true,
                data: user
            });
        }
        else {
            console.log("User doesn't exist or kindly change the url");
            res.status(400).json({
                success: false,
                message: "User doesn't exist or kindly change the url"
            })
        }
    } catch (error) {
        console.log('User does not exist');
            res.status(404).json({
                success: false,
                message: error.message
            })
    }
}

const user_update = async(req, res) => {
    const username = req.params.username;

    try {
        data = await User.findOneAndUpdate(
            {username: username},
            {$set: req.body}
        );
        console.log('Data has been updated');
        res.status(200).json({
            success: true
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}


// Deletion occurs, but app crashes
const user_delete = async(req, res) => {
    // Add authentication
    const username = req.params.username;

    try {
        data = await User.findOneAndDelete({username: username});
        console.log('User ', username, ' deleted');
        res.status(200).json({
            success: true
        })
        res.redirect('/user/all')

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    user_all,
    user_create,
    user_get,
    user_update,
    user_delete
}