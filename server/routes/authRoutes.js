const express = require('express');
const router = express.Router();
const { register, login, getMe, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.get('/users/:id', getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
