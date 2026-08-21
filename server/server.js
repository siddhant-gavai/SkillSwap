require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./middleware/loggerMiddleware');

// Connect to Database
connectDB();

const app = express();

// Use request logger middleware
app.use(logger);

// Application Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health Check Route
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';
    res.status(200).json({
        status: 'UP',
        dbStatus,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        timestamp: new Date()
    });
});

// Global Error Handler Setup
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
