const User = require('../models/user');
const { signAccessToken } = require('../middlewares/jwtCreation')
var bcrypt = require('bcryptjs');


const user_login = async(req, res) => {
    username = req.body.username;
    password = req.body.password;
    try {
        user = await User.findOne({username : username});
        if (user) {
            
            // Checking the password
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return res.status(401).json({ 
                success: false, 
                message: 'Invalid password', 
                token: null });

            const accessToken = await signAccessToken(user.username);
            res.status(200).json({
                success: true,
                data: user,
                token: accessToken
            });
        }
        else {
            console.log("Invalid username or password");
            res.status(400).json({
                success: false,
                message: "Invalid username or password",
                token: null
            })
        }
    } catch (error) {
        console.log('Error: ', error.message);
            res.status(404).json({
                success: false,
                message: error.message,
                token: null
            })
    }
}

const user_logout = async(req, res) => {
    res.status(200).json({
        success: true,
        message: null,
        token: null
    })
}

const user_all = async(req, res) => {
    try {
        result = await User.find({}, { password: 0 });
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
        const accessToken = await signAccessToken(user.username)
        console.log('User saved')
        res.status(201).json({
            success: true,
            data: result,
            token: accessToken
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message,
            token: null
        })
    }
}

const user_get = async(req, res) => {
    const username = req.params.username;

    try {
        // To not display the password when a user is fetched
        user = await User.findOne({username : username}, { password: 0 });
        if (user) {
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


const user_delete = async(req, res) => {
    const username = req.params.username;

    try {
        data = await User.findOneAndDelete({username: username});
        console.log('User ', username, ' deleted');
        res.status(200).json({
            success: true
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    user_login,
    user_logout,
    user_all,
    user_create,
    user_get,
    user_update,
    user_delete
}