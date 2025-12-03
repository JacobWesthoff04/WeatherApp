const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const router = express.Router();

// Validate credentials
router.post('/api/auth', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error in /api/auth:', error);
        res.status(500).send('Server error');
    }
});

// Register a new user
router.post('/api/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$&*#]).{8,}$/;


        // Check if all fields are present
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send('All fields are required');
        }

        // Validate password requirements
        if(!passwordRegex.test(password)) {
            return res.status(400).send('Password does not meet complexity requirements');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // Create a new user
        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in /api/register:', error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;