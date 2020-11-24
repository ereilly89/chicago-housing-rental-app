var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


/* GET all rental listings. */
router.get('/', requireAuth, function(req, res, next) {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

	  // Obtain a list of rental listings
    const listingResource = dbo.collection("Listing").find();

    // Return all rental listings
  	listingResource.toArray( (err, rentalList) => {
        if (err) throw err;
		console.log(rentalList);
		res.render('listings', {listingArray: rentalList, page: 'Rental Listings'});
		dbs.close();
    });
  });
});

/* Get specific rental listing from id */
router.get('/:list_id', requireAuth, (req, res) => {
     var list_id = Number(req.params.list_id);
     MongoClient.connect(url, function(err, dbs) {
       if (err) throw err;
       const dbo = dbs.db("RentalDB");

       const listing = dbo.collection("Listing").find({id: list_id});

       listing.toArray( (err, theListing) => {
           if (err) throw err;
           res.render('listing_details', {theListing: theListing, page: 'Listing'});
           dbs.close();
       });
    });
});

module.exports = router;
