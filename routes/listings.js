var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";
/* GET users listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
