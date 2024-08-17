require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import path module
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const cors = require('cors');

const app = express(); // Initialize the express app

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Handle root URL request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
