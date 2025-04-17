const express= require('express');
const router= express.Router();
const {body, validationResult}= require('express-validator');
const bcrypt= require('bcryptjs');
const generateToken= require('../utils/auth');

const { createUser, getUserByEmail }= require('../model/user');


//create user

router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password }= req.body;

    try {
       
         if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }

   // Create the user
      const userId = await createUser(username, email, password);
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

//login user
router.post('/login', async (req, res) => {
    const { email, password }= req.body;
    try{
        const user= await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token= generateToken(user.id);
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
);


module.exports= router;