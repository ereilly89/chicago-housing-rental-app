const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    
    _id: String,
    booking_id: {
        type: String,
        required: true
    },
    listing_id: {
        type: Number,
        required: true
    },
    host_id: {
        type: String,
        required: true
    },
    tenant_id: {
        type: String
    },
    schedule_date: {
        type: Date,
        required: true
    },
    date_start: {
        type: Date,
        required: true 
    },
    date_end: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});

const Booking = mongoose.model('Booking', bookingSchema, 'Booking');

module.exports = { Booking }
