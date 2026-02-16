const express = require('express');
const router = express.Router();
const {
    sendRequest,
    getSentRequests,
    getReceivedRequests,
    updateRequestStatus
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendRequest);
router.get('/sent', protect, getSentRequests);
router.get('/received', protect, getReceivedRequests);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
