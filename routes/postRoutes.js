const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Fetching all posts
router.get('/all', postController.post_all);

// Post creation
router.post('/create', postController.post_create);

// Updating post
router.put('/update/:postid', postController.post_update);

// Casting vote on post
router.put('/vote/:postid', postController.post_vote); //Even get works

// Delete a post
router.delete('/delete/:postid', postController.post_del)

module.exports = router;