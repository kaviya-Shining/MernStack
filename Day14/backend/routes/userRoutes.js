const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUsers, getAnalytics } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/analytics')
    .get(protect, admin, getAnalytics);

router.route('/')
    .get(protect, admin, getUsers);

module.exports = router;
