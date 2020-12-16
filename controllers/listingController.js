
//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Listing } = require('../models/listing');
const { Review }  = require('../models/review');
const { Booking } = require('../models/booking');
const { ObjectId } = require('mongodb');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { AssertionError } = require('assert');
const { assert } = require('console'); //console
const { memoryStorage } = require('multer');
var fileUpload = require('express-fileupload');


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
  });
};


//  GET "listing/:id"

module.exports.listing_id_get = async (req, res, next) => {
  var id = req.params.id;

  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");
    console.log("ID---------------------------" + id);
    var listing = await Listing.findOne({ id: id });
    var reviews = await Review.find({ listing_id: id }).sort({ "date": -1 });
    dbs.close();
    res.render('listing_details', { theListing: listing, reviewsArray: reviews, page: 'Listing' }); 
  });

}

// GET "listing/:listing_id/image"
/*
module.exports.listing_image_get = async (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
};
*/

// DELETE "listing/:id"

module.exports.listing_id_delete = async (req, res, next) => {
  console.log("test");
  var id = req.params.id;

  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");
    var today = new Date();

    var conflictBooking = await Booking.findOne({ "listing_id": id, "date_end": { $gt: today }});
   
    if (conflictBooking == undefined) {
      Listing.remove({id: id}, async function(err, delete_info) {
        console.log("Deleting Product " + id);
        res.send({ delete_info: delete_info });
      });
    } else {
      res.send({ message: "Cannot delete listing that has future bookings." });
    }

  });
}


//  GET "listing/create"

module.exports.listing_create_get = (req, res) => {
  res.render('listing_create', { page: "Create New Listing" });
}


// GET "listing/:id/image"

module.exports.listing_image_get = (req, res) => {
  Listing.find({ "id": req.params.id }, (err, item) => {
    if (err) throw err;
    res.send({ item: item });
  })
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
    } else if (isNaN(req.body.latitude)) {
      res.json({ message: 'latitude must be a number.' });
    } else if (req.body.longitude.length == 0) {
      res.json({ message: 'Longitude is required.' });
    } else if (isNaN(req.body.longitude)) {
      res.json({ message: 'Longitude must be a number.' })
    } else if (req.body.bathrooms.length == 0) {
      res.json({ message: 'Bathrooms is required.' });
    } else if (isNaN(req.body.bathrooms)) {
      res.json({ message: 'Bathrooms must be a number.' });
    } else if (req.body.bedrooms.length == 0) {
      res.json({ message: 'Bedrooms is required.' });
    } else if (isNaN(req.body.bedrooms)) {
      res.json({ message: 'Bedrooms must be a number.' });
    } else if (req.body.beds.length == 0) {
      res.json({ message: 'Beds is required.' });  
    } else if (isNaN(req.body.beds)) {
      res.json({ message: 'Beds must be a number.' });
    } else if (req.body.price.length == 0) {
      res.json({ message: 'Price per day is required.' });
    } else if (isNaN(req.body.price)) {
      res.json({ message: 'Price must be a number. '});
    } else {

      /*
      const serviceKey = path.join(__dirname, './rentalapp-297023-4fafe599b855.json')

      // Instantiate a storage client
      const googleCloudStorage = new Storage({
        projectId: "rentalapp-297023",
        keyFilename: serviceKey
      });
      const m = multer({
        storage: memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024 // no larger than 5mb
        }
      });
      const bucket = googleCloudStorage.bucket("rentalapp-images");
      console.log("listing about to be created.");
      */
      const listing = await Listing.create({
        _id: new ObjectId(),
        id: new ObjectId(),
        name: req.body.name,
        description: req.body.description,
        neighborhood_overview: req.body.neighborhood_overview,
        host_id: req.body.host_id,
        host_name: req.body.host_name,
        host_since: req.body.host_since,
        image: req.body.image,
        picture_url: "http://localhost:3000/listing/id/image",
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
/*
      const { originalname, buffer } = req.files;
      console.log("originalname: " + originalname);
      const blob = bucket.file(originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });
      blobStream.on("error", err => {
        console.log(err);
      });
      blobStream.on("finish", () => {
          // The public URL can be used to access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/rentalapp-images/listings`;
        console.log("onFinish.");
        // Make the image public to the web
        blob.makePublic().then(() => {
           res.status(200).json({ listing, host_id: req.body.host_id, message: "Listing successfully created." });
        });
      });
*/
    res.status(200).json({ listing, host_id: req.body.host_id, message: "Listing successfully created." });

    }

  } catch (err) {
      console.log(err);
      res.status(400).json({ err, message: "There was an error creating the listing." });
  }
}