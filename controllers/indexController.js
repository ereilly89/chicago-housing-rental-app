

// Home page
module.exports.index_get = (req, res) => {
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
}
