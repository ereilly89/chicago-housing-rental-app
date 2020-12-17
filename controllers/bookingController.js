//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
const { Booking } = require('../models/booking')

const { ObjectId } = require('mongodb');

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";


// GET "booking/:listing_id"

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


// POST "booking/:listing_id"

module.exports.booking_post = async (req, res, next) => {
  
  try {

      MongoClient.connect(url, async function (err, dbs) {
        if (err) throw err;
        const dbo = dbs.db("RentalDB");
        var listing = await dbo.collection("Listing").findOne({ "id": req.params.listing_id });
        var host_id = listing.host_id;
        var today = new Date();

        const { listing_id, tenant_id, schedule_date, date_start, date_end, days } = req.body;
        
        var price = Number(listing.price)*days;

        //console.log("DATE_START: " + date_start);
        //console.log("TODAY: " + today);

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
          var overBooked = await Booking.find({
            "listing_id": req.params.listing_id,
            $or: [{ "date_start": { $gte: date_start, $lt: date_end }}, { "date_end": { $gt: date_start, $lte: date_end }}, { $and: [{ "date_start": { $lt: date_start } }, { "date_end": { $gt: date_start } } ]}, { $and: [{ "date_start": { $lt: date_end } }, { "date_end": { $gt: date_end } } ]}]
          });

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


// DELETE "booking/:booking_id"

module.exports.booking_delete= (req,res,next) =>{
   var booking_id = req.params.booking_id;
   MongoClient.connect(url, async function(err, dbs) {
     const dbo = dbs.db("RentalDB");
     Booking.remove({ booking_id: booking_id}, async function(err, delete_info) {
       res.send({ delete_info: delete_info });
     });
   });
}
