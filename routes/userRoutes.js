const express = require('express');
const User = require('../models/user');
const router = express.Router();
const userController = require('../controllers/userController');

// User login
router.post('/login', userController.user_login);

// User logout
router.get('/logout', userController.user_logout);

// Fetch all users
router.get('/all', userController.user_all);

// Creating User
router.post('/create', userController.user_create);

// Fetch a specific user
router.get('/:username', userController.user_get);

// Update user
router.put('/update/:username', userController.user_update);

// Delete user
router.delete('/delete/:username', userController.user_delete);


module.exports = router;