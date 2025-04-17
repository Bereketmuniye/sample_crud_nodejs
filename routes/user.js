const express = require('express');
const router = express.Router();
const { findUserByEmail } = require('../model/user.js');
const { authenticate } = require('../middleware/authMiddleware.js');
const UserController = require('../controllers/UserController.js');


router.get('/profile',authenticate,async (req, res) => {
    try{
        const user = await findUserByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [, ...userData] = user;
        res.status(200).json({ ...userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
router.get('/',UserController.getAllUsers); // Get all users
router.get('/:id', UserController.getUserById); // Get user by ID
router.get('/username/:username', UserController.getUserByUsername); // Get user by username
router.post('/create', UserController.createUser); // Create new user
router.put('/:id', UserController.updateUser); // Update user by ID
router.delete('/:id',UserController.deleteUser); // Delete user by ID

module.exports = router;
