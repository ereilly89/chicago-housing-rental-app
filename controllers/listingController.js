
//Import models
const { Tenant } = require('../model/tenant')
const { Host } = require('../model/host')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


//  "listings"
module.exports.listings_get = (req, res) => {
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
    //res.render('listings', {listingArray: {}, page: 'Rental Listings'});
  });
};


//  "listing/:id"
module.exports.listing_id_get = (req, res) => {
  var id = Number(req.params.id);
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

    const listing = dbo.collection("Listing").find({id: id});

    listing.toArray( (err, theListing) => {
        if (err) throw err;
        res.render('listing_details', {theListing: theListing, page: 'Listing'});
        dbs.close();
    });
  });
}
