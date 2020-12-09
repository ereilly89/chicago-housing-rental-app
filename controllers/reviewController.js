//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Review } = require('../models/review')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


module.exports.review_get = (req, res) => {
    res.render('review', { page: 'Submit Review' });
}


module.exports.review_post = (req, res) => {

}