const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
   _id: String,
    id: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    picture_url: {
        type: String,
        
    },
    neighborhood_overview: {
        type: String,
        required: false,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    host_id: {
        type: String,
        required: true,
        trim: true
    },
    host_name: {
        type: String,
        required: true
    },
    host_since: {
        type: Date,
        required: true,
        minlength: 6
    },
    neighborhood_cleansed: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    room_type: {
        type: String,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number_of_reviews: {
        type: Number,
        required: true
    },
    review_scores_rating: {
        type: Number,
        required: true
    },
    
    availability: [{
        type: String
    },
    {
        type: String
    }]

    
    
});

const Listing = mongoose.model('Listing', listingSchema, 'Listing');

module.exports = { Listing }
