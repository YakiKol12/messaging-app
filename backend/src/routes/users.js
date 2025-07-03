const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Login a user
router.post('/login', userController.login);

// (Optional) Get all users
router.get('/', userController.getAllUsers);

// (Optional) Get user by ID
router.get('/:id', userController.getUserById);

// Delete a user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;
