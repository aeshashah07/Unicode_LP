const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Fetching all posts
router.get('/all', postController.post_all);

// Post creation
router.post('/create', postController.post_create);

// Updating post
router.post('/update/:username/:postid', postController.post_update);


module.exports = router;