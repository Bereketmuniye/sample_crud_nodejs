const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');

router.get('/',UserController.getAllUsers); // Get all users
router.get('/:id', UserController.getUserById); // Get user by ID
router.get('/username/:username', UserController.getUserByUsername); // Get user by username
router.post('/create', UserController.createUser); // Create new user
router.put('/:id', UserController.updateUser); // Update user by ID
router.delete('/:id',UserController.deleteUser); // Delete user by ID

module.exports = router;
