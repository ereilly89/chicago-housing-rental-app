//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Review } = require('../models/review')

const { ObjectId } = require('mongodb');


//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


// GET "review/tenant/:tenant_id/listing/:listing_id"

module.exports.review_listing_get = async (req, res) => {
    var tenant_id = req.params.tenant_id;
    var listing_id = req.params.listing_id;
    MongoClient.connect(url, async function (err, dbs) {
      if (err) throw err;
      const dbo = dbs.db("RentalDB");
      var tenant = await dbo.collection("Tenant").findOne({ "tenant_id": req.params.tenant_id });
      var listing = await dbo.collection("Listing").findOne({ "id": listing_id });
      dbs.close();
      res.render('review', { page: "Submit Review", tenant: tenant, listing: listing });
    })
}


//POST "review/tenant/:tenant_id/listing/:listing_id"

module.exports.review_listing_post = async (req, res) => {

  console.log("REVIEW LISTING POST.");
  console.log("REQ: " + req.body.reviewer_name);
  console.log("REQ: " + req.body.reviewer_id);
  if (req.body.comments.length == 0) {
    res.status(400).json({ message: 'Comment is required.' });

  } else {
    console.log("submitting review");
    const review = await Review.create({
        id: new ObjectId(),
        listing_id: req.params.listing_id,
        comments: req.body.comments,
        date: new Date(),
        reviewer_id: req.body.reviewer_id,
        reviewer_name: req.body.reviewer_name,
    });
    res.status(200).json({ review: review });
  }  

}