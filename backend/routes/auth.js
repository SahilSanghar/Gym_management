const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Register user
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await admin.auth().createUser({ email, password });
        await admin.auth().setCustomUserClaims(user.uid, { role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
    // Validate password - requires implementing custom logic or using a third-party service
        res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
