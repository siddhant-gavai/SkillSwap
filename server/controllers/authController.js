const User = require('../models/User');
const { ApiResponse, ApiError, asyncHandler } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, 'Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ApiError(400, 'User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json(
            new ApiResponse(201, {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }, "User registered successfully")
        );
    } else {
        throw new ApiError(400, 'Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json(
            new ApiResponse(200, {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }, "User logged in successfully")
        );
    } else {
        throw new ApiError(401, 'Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json(
        new ApiResponse(200, user, "User data fetched successfully")
    );
});
