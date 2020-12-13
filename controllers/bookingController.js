//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Booking } = require('../models/booking')

const { ObjectId } = require('mongodb');

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

/*
module.exports.schedule_get= (req,res,) => {
    res.render('schedule_bookings', { page: "Schedule Booking" });
}
*/


module.exports.booking_listing_get = async (req, res, next) => {
  var listing_id = req.params.listing_id;
  MongoClient.connect(url, async function (err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("RentalDB");
    var listing = await dbo.collection("Listing").findOne({ "id": listing_id });
    dbs.close();
    res.render('booking_schedule', { page: "Schedule Booking", listing: listing });
  })
}

/*module.exports.bookings_get= (req,res,next) => {
    res.render('bookings', { page: "Booking Lists" });
    req.collection.find({})
    .toArray()//move them into an array
    .then(results => res.json(results))
    .catch(error => res.send(error));//catch any erros 
}
*/

// POST "booking/:listing_id"
module.exports.booking_post = async (req, res, next) => {
  
  try {
      MongoClient.connect(url, async function (err, dbs) {
        if (err) throw err;
        const dbo = dbs.db("RentalDB");
        var listing = await dbo.collection("Listing").findOne({ "id": req.params.listing_id });
        var host_id = listing.host_id;

        const { listing_id, tenant_id, schedule_date, date_start, date_end, days } = req.body;
        console.log("days: " + days);
        console.log("listing.price: " + listing.price);
        var price = Number(listing.price)*days;
        console.log("PRICE: " + price);

        if (!date_start) {
          res.status(400).json({ message: "Start date is required." });

        }  else if (!date_end) {
          res.status(400).json({ message: "End date is required. "});

        } else if (date_start > date_end) {
          res.status(400).json({ message: "Start date must precede end date." });

        } else if (date_start == date_end) {
          res.status(400).json({ message: "Must schedule for at least one night." });
        } else {
          //Validate Available Booking
          console.log("listing_id: " + req.params.listing_id);
          var overBooked = await Booking.find({
            "listing_id": req.params.listing_id,
            $or: [{ "date_start": { $gte: date_start, $lt: date_end }}, { "date_end": { $gt: date_start, $lte: date_end }}]
          });
          console.log(overBooked);
          console.log("Date Start: " + overBooked.date_start + "\nDate End: " + overBooked.date_end);

          if (overBooked.length > 0) {
            res.status(400).json({ message: "Not available for that timeframe." });
          } else {
            
            const booking = await Booking.create({
              _id: new ObjectId(),
              booking_id: new ObjectId(),
              listing_id: req.params.listing_id,
              host_id: host_id,
              tenant_id: tenant_id,
              schedule_date: schedule_date,
              date_start: date_start,
              date_end: date_end,
              price: price
            });
            console.log(booking);
            res.status(200).json({ booking: booking, message: "Booking successfully scheduled." });
            
          }
        }
      })
    
  } catch (err) {
      //const errors = handleErrors(err);
      console.log(err);
      res.status(400).json({ err });
  }
  
  
}


module.exports.booking_delete= (req,res,next) =>{

   var booking_id = req.params.booking_id;
 
   MongoClient.connect(url, async function(err, dbs) {
     const dbo = dbs.db("RentalDB");
 
     Booking.remove({ booking_id: booking_id}, async function(err, delete_info) {
       console.log("Deleting Product " + booking_id);
       res.send({ delete_info: delete_info });
     });
   });

}
