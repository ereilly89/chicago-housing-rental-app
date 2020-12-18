
//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Booking } = require('../models/booking');
const { Listing } = require('../models/listing');

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

// GET "profile/tenant/:tenant_id/edit"
module.exports.profile_tenant_edit_get = (req, res) => {
    var tenant_id = Number(req.params.tenant_id);
   Tenant.findOne({"tenant_id" : req.params.tenant_id})
   .then(data => {
     console.log(data);
     if (!data)
       res.render('profile_tenant_edit', { tenant: null, page: 'Error', message: "Tenant profile not found."});
     else res.render('profile_tenant_edit', { tenant: data, page: 'Tenant Profile'});
   })
   .catch(err => {
     res.render('profile_tenant_edit', { tenant: null, page: 'Error', message: "Error retrieving profile with id=" + id});
     console.log("err:"+err);
   });
}

module.exports.profile_tenant_edit_post = async (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

    var phoneno = /^\d{10}$/;

    if (!req.body.tenant_phone.match(phoneno)) {
        res.json({ message: 'Phone number must contain exactly 10 digits.' });
    } else if (req.body.tenant_first.length == 0) {
        res.json({ message: 'First name is required.' });
    } else if (req.body.tenant_last.length == 0) {
        res.json({ message: 'Last name is required.' });
    } else {
      try {
        var myquery = { tenant_id: req.body.tenant_id };
        console.log(myquery);
        var newvalues = { $set: {
          first: req.body.tenant_first,
          last: req.body.tenant_last,
        }};
        console.log(newvalues);

        dbo.collection("Tenant").updateOne(myquery, newvalues, function(err, res) {
          if(err){
            throw err;
          }

          console.log("updated");

        });
          res.status(200).json({message: "Profile Saved.", tenant_id: req.body.tenant_id});
      } catch (err) {
          //const errors = handleErrors(err);

          res.status(400).json({ err, message: "Error Saving Profile." });
      }
    }
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
        res.render("profile_host_listings", { page: "My Listings", host_id: req.params.host_id, listingArray: rentalList });
    		dbs.close();
    });
  });
}


// GET "profile/tenant/:tenant_id/bookings"

module.exports.profile_tenant_bookings_get = async (req, res) => {

  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");
    var today = new Date();

	  // Obtain a list of rental listings
    const bookingResource = dbo.collection("Booking").find({ $and: [{ "tenant_id": req.params.tenant_id }, { "date_end": { $gt: today } }]}).sort({ "date_start": 1 });

    // Return all rental listings
  	bookingResource.toArray( (err, bookingList) => {
        if (err) throw err;
    		console.log(bookingList);
        res.render("profile_tenant_bookings", { page: "My Bookings", tenant_id: req.params.tenant_id, bookingArray: bookingList });
    		dbs.close();
    });
  });

}


// GET "profile/host/:host_id/bookings"

module.exports.profile_host_bookings_get = (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");
    var today = new Date();

	  // Obtain a list of rental listings
    const bookingResource = dbo.collection("Booking").find({ $and: [{ "host_id": req.params.host_id }, { "date_end": { $gt: today } }]}).sort({ "date_start": 1 });

    // Return all rental listings
  	bookingResource.toArray( (err, bookingList) => {
        if (err) throw err;
        res.render("profile_host_bookings", { page: "My Bookings", host_id: req.params.host_id, bookingArray: bookingList });
    		dbs.close();
    });
  });
}


// GET "profile/tenant/:tenant_id/booking/:booking_id"

module.exports.profile_tenant_booking_get = async (req, res) => {

  var booking_id = req.params.booking_id;
  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");
    var booking = await Booking.findOne({ booking_id: req.params.booking_id });
    dbs.close();
    res.render('booking_details_tenant', { theBooking: booking, tenant_id: req.params.tenant_id, page: 'Booking' });
  });
}


// GET "profile/host/:host_id/booking/:booking_id"

module.exports.profile_host_booking_get = async (req, res) => {
  var booking_id = req.params.booking_id;
  MongoClient.connect(url, async function(err, dbs) {
    const dbo = dbs.db("RentalDB");
    var booking = await Booking.findOne({ "booking_id": req.params.booking_id });
    dbs.close();
    res.render('booking_details_host', { theBooking: booking, host_id: req.params.host_id, page: 'Booking' });
  });
}


// GET "profile/tenenant/:tenant_id/booking-history"

module.exports.profile_tenant_bookingHistory_get = (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");
    var today = new Date();

    // Obtain a list of rental listings
    const bookingResource = dbo.collection("Booking").find({ $and: [{ "tenant_id": req.params.tenant_id }, { "date_end": { $lt: today } }]}).sort({ "date_start": -1 });

    // Return all rental listings
    bookingResource.toArray( (err, bookingList) => {
        if (err) throw err;
        res.render("profile_tenant_booking_history", { page: "My Booking History", tenant_id: req.params.tenant_id, bookingArray: bookingList });
        dbs.close();
    });
  });
}


// GET "profile/host/:host_id/booking-history"

module.exports.profile_host_bookingHistory_get = (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");
    var today = new Date();

    const bookingResource = dbo.collection("Booking").find({ $and: [{ "host_id": req.params.host_id }, { "date_end": { $lt: today } }]}).sort({ "date_start": -1 });

    // Return all rental listings
    bookingResource.toArray( (err, bookingList) => {
        if (err) throw err;
        res.render("profile_host_booking_history", { page: "My Booking History", host_id: req.params.host_id, bookingArray: bookingList });
        dbs.close();
    });
  });
}

// GET "profile/host/:host_id/edit"
module.exports.profile_host_profile_edit_get = (req, res) => {
  Host.findOne({"host_id" : req.params.host_id})

  .then(data => {
    console.log(data);
    if (!data)
      res.render('profile_host_edit', {host: null, page: 'Error', message: "Host profile not found."});
    else res.render('profile_host_edit', {host: data, page: 'Edit Profile'});
  })
  .catch(err => {
    res.render('profile_host_edit', {host: null, page: 'Error', message: "Error retrieving profile with id=" + id});
    console.log("err:"+err);
  });
}

module.exports.profile_host_profile_edit_post = async (req, res) => {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");

    var phoneno = /^\d{10}$/;

    if (req.body.host_name.length == 0) {
        res.json({ message: 'Host name is required.' });
    } else if (!req.body.host_phone.match(phoneno)) {
        res.json({ message: 'Phone number must contain exactly 10 digits.' });
    } else if (req.body.host_about == 0) {
        res.json({ message: 'Host about is required.' })
    } else if (req.body.host_neighborhood.length == 0) {
        res.json({ message: 'Host neighborhood is required. ' });
    } else {
      try {
        var myquery = { host_id: req.body.host_id };
        console.log(myquery);
        var newvalues = { $set: {
          host_name: req.body.host_name,
          host_about: req.body.host_about,
          host_phone: req.body.host_phone,
          host_neighbourhood: req.body.host_neighborhood
        }};
        console.log(newvalues);

        dbo.collection("Host").updateOne( myquery, newvalues, function(err, res) {
          console.log("updated");

        });
          res.status(200).json({message: "Profile Saved.", host_id: req.body.host_id });
      } catch (err) {
          //const errors = handleErrors(err);
          res.status(400).json({ err, message: "Error Saving Profile." });
      }
    }
  });
}
