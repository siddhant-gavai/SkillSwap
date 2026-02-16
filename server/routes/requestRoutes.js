const express = require('express');
const router = express.Router();
const {
    sendRequest,
    getSentRequests,
    getReceivedRequests,
    updateRequestStatus,
    scheduleSession
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendRequest);
router.get('/sent', protect, getSentRequests);
router.get('/received', protect, getReceivedRequests);
router.put('/:id', protect, updateRequestStatus);
router.put('/:id/schedule', protect, scheduleSession);

module.exports = router;
