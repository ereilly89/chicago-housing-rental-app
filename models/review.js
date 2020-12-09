const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: String,
    listing_id: {
        required: true,
        type: Number
    },
    id: {
        required: true,
        type: Number //host id
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
