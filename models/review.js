const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    id: {
        required: true,
        type: Number 
    },
    listing_id: {
        required: true,
        type: String
    },
    date: Date,
    reviewer_id: {
        required: true,
        type: Number //tenant id
    },
    reviewer_name: {
        required: true,
        type: String
    },
    comments: String
});

const Review = mongoose.model('Review', reviewSchema, 'Review');

module.exports = { Review };
