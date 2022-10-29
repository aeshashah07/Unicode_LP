const User = require('../models/user');

const user_all = (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
            console.log('All users fetched successfully');
        })
        .catch((error) => {
            console.log(error);
            res.send('404! N.');
        })
}

const user_create = (req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        password: req.body.password,
    });

    user.save()
        .then((result) => {
            console.log('User saved')
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

const user_get = (req, res) => {
    const username = req.params.username;
    User.findOne({username : username})
        .then((user) => {
            if (user) {
                // Can provide authentication; to view any profile, login
                res.send(user);}
            else {
                res.send("User doesn't exist or kindly change the url");
            }
        })
        .catch((error) => {
                res.send('User does not exist')
        })
}

const user_update = (req, res) => {
    const username = req.params.username;
    User.findOneAndUpdate(
        {username: username},
        {$set: req.body},
        (error) => {
            if (error) { console.log(error) }
        }
    )

    console.log('Data has been updated');
    res.end();
}

const user_delete = (req, res) => {
    // Add authentication
    const username = req.params.username;
    User.findOneAndDelete({username: username})
        .then((result) => {
            console.log('User ', username, ' deleted');
            // res.json({ redirect: '/users'});
            res.redirect('/user/all')
        })
        .catch((error) => {
            console.log(error);
        })
}


module.exports = {
    user_all,
    user_create,
    user_get,
    user_update,
    user_delete
}