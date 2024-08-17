// routes/api.js
const express = require('express');
const router = express.Router();

// Define a test route
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

module.exports = router;
