const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    tags: [String],
    likesCount: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

// Indexes for search and filter
quoteSchema.index({ text: 'text', author: 'text' });
quoteSchema.index({ category: 1 });

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
