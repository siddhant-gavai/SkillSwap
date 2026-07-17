const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillswapDB';
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        if (mongoURI !== 'mongodb://127.0.0.1:27017/skillswapDB') {
            console.log("Attempting fallback to local MongoDB...");
            try {
                await mongoose.connect('mongodb://127.0.0.1:27017/skillswapDB');
                console.log("Connected to fallback local MongoDB successfully");
                return;
            } catch (fallbackErr) {
                console.error("Fallback MongoDB connection error:", fallbackErr.message);
            }
        }
        process.exit(1);
    }
};

module.exports = connectDB;
