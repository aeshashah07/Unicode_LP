const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken');
const verifyPostCreator = require('../middlewares/verifyPostCreator');


// Fetching all posts
router.get('/all', postController.post_all);

// Post creation
router.post('/create', verifyToken, postController.post_create);

// Updating post
router.put('/update/:postid', verifyToken, verifyPostCreator, postController.post_update);

// Casting vote on post
router.put('/vote/:postid', verifyToken, postController.post_vote); //Even get works

// Delete a post
router.delete('/delete/:postid', verifyToken, verifyPostCreator, postController.post_del)

module.exports = router;