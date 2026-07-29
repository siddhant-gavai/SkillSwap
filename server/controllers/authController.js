const User = require('../models/User');
const { ApiResponse, ApiError, asyncHandler } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @param   {Object} req - Express request object containing name, email, password
 * @param   {Object} res - Express response object
 */
exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, 'Please add all fields');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Please provide a valid email address');
    }

    // Password length validation
    if (password.length < 6) {
        throw new ApiError(400, 'Password must be at least 6 characters long');
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
                role: user.role,
                token: generateToken(user._id)
            }, "User registered successfully")
        );
    } else {
        throw new ApiError(400, 'Invalid user data');
    }
});

/**
 * @desc    Authenticate a user
 * @route   POST /api/auth/login
 * @access  Public
 * @param   {Object} req - Express request object containing email, password
 * @param   {Object} res - Express response object
 */
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
                role: user.role,
                token: generateToken(user._id)
            }, "User logged in successfully")
        );
    } else {
        throw new ApiError(401, 'Invalid credentials');
    }
});

/**
 * @desc    Get user data
 * @route   GET /api/auth/me
 * @access  Private
 * @param   {Object} req - Express request object (auth user set by middleware)
 * @param   {Object} res - Express response object
 */
exports.getMe = asyncHandler(async (req, res) => {
    // Find the currently authenticated user
    const user = await User.findById(req.user.id);

    res.status(200).json(
        new ApiResponse(200, user, "User data fetched successfully")
    );
});

/**
 * @desc    Get user profile by ID
 * @route   GET /api/auth/users/:id
 * @access  Public
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const Review = require('../models/Review');
    const reviewsCount = await Review.countDocuments({ receiverId: req.params.id });

    // Format response matching frontend expectations
    const userProfile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        bio: user.bio,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted,
        rating: user.rating,
        createdAt: user.createdAt,
        reviewsCount
    };

    res.status(200).json(
        new ApiResponse(200, userProfile, "User profile fetched successfully")
    );
});

