const express = require('express');
const router = express.Router();
const {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
    getMySkills
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const { validateSkill } = require('../middleware/validationMiddleware');

router.route('/')
    .get(getSkills)
    .post(protect, validateSkill, createSkill);

router.route('/my').get(protect, getMySkills);

router.route('/:id')
    .get(getSkill)
    .put(protect, validateSkill, updateSkill)
    .delete(protect, deleteSkill);

module.exports = router;
