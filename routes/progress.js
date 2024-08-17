// routes/progress.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to protect routes

// Get user progress
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user progress
router.post('/update', auth, async (req, res) => {
    const { score, tries } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.score = score;
        user.tries = tries;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
