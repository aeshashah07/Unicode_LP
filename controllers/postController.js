const User = require('../models/user');
const Post = require('../models/post');


const post_all = (req, res) => {
    Post.find()
        .then((result) => {
            res.send(result);
            console.log('All posts fetched successfully');
        })
        .catch((error) => {
            console.log(error);
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
        })
        // To find the postID and append it to the array of post in users DB
        .then(() => {
            // Use the login username
            Post.findOne({created_by : req.body.created_by, uploaded_on: now})
            .then((user) => {
                if (user) {
                    User.findOneAndUpdate(
                        // Get the login username here
                        {username: req.body.created_by},
                        {"$push": { "posts":  user._id}},
                        (error) => {
                            if (error) { console.log(error) }
                        }
                    )
                    res.send('Your post is created');
                    // Use the login username
                }
                else {
                    console.log('Post created but not linked with the user')
                    res.send('Error while creating the post');
                }
            })
        })
        .catch((err) => {
            console.log(err);
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
            if (error) { console.log(error) }
        }
    )

    console.log('Post has been updated');
    res.end();


module.exports = {
    post_all,
    post_create,
    post_update
}