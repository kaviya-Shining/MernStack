const Quote = require('../models/Quote');
const User = require('../models/User');

// @desc    Get all quotes (with search, filter, sort, pagination)
// @route   GET /api/quotes
// @access  Public
const getQuotes = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? { text: { $regex: req.query.keyword, $options: 'i' } }
            : {};

        const category = req.query.category ? { category: req.query.category } : {};
        const author = req.query.author ? { author: req.query.author } : {};

        const query = { ...keyword, ...category, ...author };
        const sortParams = req.query.sort === 'popular' ? { likesCount: -1 } : { createdAt: -1 };

        const count = await Quote.countDocuments(query);
        const quotes = await Quote.find(query)
            .populate('category', 'name')
            .populate('createdBy', 'name')
            .sort(sortParams)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ quotes, page, pages: Math.ceil(count / pageSize), total: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single quote
// @route   GET /api/quotes/:id
// @access  Public
const getQuoteById = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
            .populate('category', 'name')
            .populate('createdBy', 'name');

        if (quote) {
            res.json(quote);
        } else {
            res.status(404).json({ message: 'Quote not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a quote
// @route   POST /api/quotes
// @access  Private/Admin
const createQuote = async (req, res) => {
    try {
        const { text, author, category, tags } = req.body;

        const quote = new Quote({
            text,
            author,
            category,
            tags,
            createdBy: req.user._id,
        });

        const createdQuote = await quote.save();
        res.status(201).json(createdQuote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle like on quote
// @route   PUT /api/quotes/:id/like
// @access  Private
const toggleLikeQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!quote || !user) {
            return res.status(404).json({ message: 'Quote or User not found' });
        }

        const isLiked = user.likedQuotes.includes(quote._id);

        if (isLiked) {
            user.likedQuotes = user.likedQuotes.filter(id => id.toString() !== quote._id.toString());
            quote.likesCount = quote.likesCount > 0 ? quote.likesCount - 1 : 0;
        } else {
            user.likedQuotes.push(quote._id);
            quote.likesCount += 1;
        }

        await user.save();
        await quote.save();

        res.json({ message: isLiked ? 'Quote unliked' : 'Quote liked', likesCount: quote.likesCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTrendingQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find({})
            .populate('category', 'name')
            .sort({ likesCount: -1 })
            .limit(6);
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle save/bookmark on quote
// @route   PUT /api/quotes/:id/save
// @access  Private
const toggleSaveQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!quote || !user) {
            return res.status(404).json({ message: 'Quote or User not found' });
        }

        const isSaved = user.savedQuotes.includes(quote._id);

        if (isSaved) {
            user.savedQuotes = user.savedQuotes.filter(id => id.toString() !== quote._id.toString());
        } else {
            user.savedQuotes.push(quote._id);
        }

        await user.save();

        res.json({ message: isSaved ? 'Quote unsaved' : 'Quote saved', savedQuotes: user.savedQuotes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuotes, getQuoteById, createQuote, toggleLikeQuote, getTrendingQuotes, toggleSaveQuote };
