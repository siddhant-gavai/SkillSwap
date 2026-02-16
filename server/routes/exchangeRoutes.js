const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, exchangeController.createRequest);
router.get('/sent', protect, exchangeController.getMyRequests);
router.get('/received', protect, exchangeController.getRequestsForMe);
router.put('/:id/status', protect, exchangeController.updateRequestStatus);

module.exports = router;
