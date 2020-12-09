
//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


// GET "profile/tenant/:tenant_id"
module.exports.profile_tenant_get = (req, res) => {
    var tenant_id = Number(req.params.tenant_id);
   Tenant.findOne({"tenant_id" : req.params.tenant_id})
   .then(data => {
     console.log(data);
     if (!data)
       res.render('profile_tenant', { tenant: null, page: 'Error', message: "Tenant profile not found."});
     else res.render('profile_tenant', { tenant: data, page: 'Tenant Profile'});
   })
   .catch(err => {
     res.render('profile_tenant', { tenant: null, page: 'Error', message: "Error retrieving profile with id=" + id});
     console.log("err:"+err);
   });
}


// GET "profile/host/:host_id"
module.exports.profile_host_get = (req, res) => {
  Host.findOne({"host_id" : req.params.host_id})
  .then(data => {
    console.log(data);
    if (!data)
      res.render('profile_host', {host: null, page: 'Error', message: "Host profile not found."});
    else res.render('profile_host', {host: data, page: 'Host Profile'});
  })
  .catch(err => {
    res.render('profile_host', {host: null, page: 'Error', message: "Error retrieving profile with id=" + id});
    console.log("err:"+err);
  });
}


// GET "profile/host/:host_id/listings"
module.exports.profile_host_listings_get = (req, res) => {
  
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

	  // Obtain a list of rental listings
    const listingResource = dbo.collection("Listing").find({ "host_id": req.params.host_id });

    // Return all rental listings
  	listingResource.toArray( (err, rentalList) => {
        if (err) throw err;
    		console.log(rentalList);
        res.render("profile_host_listings", { page: "My Listings", listingArray: rentalList });
    		dbs.close();
    });
    //res.render('listings', {listingArray: {}, page: 'Rental Listings'});
  });
}
