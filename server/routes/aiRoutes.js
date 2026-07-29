const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get AI recommendations
// @route   POST /api/ai/recommend
// @access  Private
router.post('/recommend', protect, getRecommendations);

module.exports = router;
