const express = require('express');
const router = express.Router();
const { getQuotes, getQuoteById, createQuote, toggleLikeQuote, getTrendingQuotes, toggleSaveQuote } = require('../controllers/quoteController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getQuotes)
    .post(protect, admin, createQuote);

router.get('/trending', getTrendingQuotes);

router.route('/:id')
    .get(getQuoteById);

router.route('/:id/like')
    .put(protect, toggleLikeQuote);

router.route('/:id/save')
    .put(protect, toggleSaveQuote);

module.exports = router;
