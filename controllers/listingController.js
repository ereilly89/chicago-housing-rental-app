
//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Listing } = require('../models/listing');
const { Review }  = require('../models/review');
const { ObjectId } = require('mongodb');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { AssertionError } = require('assert');
const { assert } = require('console'); //console

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";
var db;


MongoClient.connect(url, function (err, database) {
  if (err)
    throw err
  else {
    db = database;
    console.log("Connected to MongoDB.");
  }
})


//  GET "listings"

module.exports.listings_get = (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

	  // Obtain a list of rental listings
    const listingResource = dbo.collection("Listing").find().limit(25);

    // Return all rental listings
  	listingResource.toArray( (err, rentalList) => {
        if (err) throw err;
    		console.log(rentalList);
    		res.render('listings', { listingArray: rentalList, page: 'Rental Listings' });
    		dbs.close();
    });
    //res.render('listings', {listingArray: {}, page: 'Rental Listings'});
  });
};


//  GET "listing/:id"

module.exports.listing_id_get = async (req, res, next) => {
  var id = Number(req.params.id);

  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");
    console.log("ID---------------------------" + id);
    var listing = await Listing.findOne({ id: id });
    var reviews = await Review.find({ listing_id: id });

    dbs.close();

    res.render('listing_details', { theListing: listing, reviewsArray: reviews, page: 'Listing' }); 
  
  });

}


// DELETE "listing/:id"

module.exports.listing_id_delete = async (req, res, next) => {
  console.log("test");
  var id = req.params.id;

  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");

    Listing.remove({id: id}, async function(err, delete_info) {
      console.log("Deleting Product " + id);
      res.send({ delete_info: delete_info });
    });
  });
}


//  GET "listing/create"

module.exports.listing_create_get = (req, res) => {
  res.render('listing_create', { page: "Create New Listing" });
}


//  POST "listing/create"

module.exports.listing_create_post = async (req, res) => {

  try {

    if (req.body.name.length == 0) {
      res.json({ message: 'Listing name is required.' });

    } else if (req.body.description.length == 0) {
      res.json({ message: 'Description is required.' });

    } else if (req.body.latitude.length == 0) {
      res.json({ message: 'Latitude is required.' });

    } else if (req.body.longitude.length == 0) {
      res.json({ message: 'Longitude is required.' });

    } else if (req.body.bathrooms.length == 0) {
      res.json({ message: 'Bathrooms is required.' });

    } else if (req.body.bedrooms.length == 0) {
      res.json({ message: 'Bedrooms is required.' });

    } else if (req.body.beds.length == 0) {
      res.json({ message: 'Beds is required.' });  
    
    } else if (req.body.price.length == 0) {
      res.json({ message: 'Price per day is required.' });

    } else {

      const listing = await Listing.create({
          _id: new ObjectId(),
          id: new ObjectId(),
          name: req.body.name,
          description: req.body.description,
          neighborhood_overview: req.body.neighborhood_overview,
         /*
          img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
          },
          */
          host_id: req.body.host_id,
          host_name: req.body.host_name,
          host_since: req.body.host_since,
          neighborhood_cleansed: req.body.neighborhood_cleansed,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          room_type: req.body.room_type,
          bathrooms: req.body.bathrooms,
          bedrooms: req.body.bedrooms,
          beds: req.body.beds,
          price: Number(req.body.price),
          number_of_reviews: req.body.number_of_reviews,
          review_scores_rating: req.body.review_scores_rating,
          availabilities: [req.body.date_start, req.body.date_end],
      });
      res.status(200).json({ listing, host_id: req.body.host_id, message: "Listing successfully created." });

    }
  } catch (err) {
      //const errors = handleErrors(err);
      console.log(err);
      res.status(400).json({ err });
  }
}