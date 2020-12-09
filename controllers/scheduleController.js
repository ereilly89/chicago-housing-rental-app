//Import models
const { Tenant } = require('../models/tenant')
const { Host } = require('../models/host')
//const {bookingModel} = require('../models/booking')

//Database connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

module.exports.schedule_get= (req,res,) => {
    res.render('schedule_bookings', { page: "Schedule Booking" });
}

/*module.exports.bookings_get= (req,res,next) => {
    res.render('bookings', { page: "Booking Lists" });
    req.collection.find({})
    .toArray()//move them into an array
    .then(results => res.json(results))
    .catch(error => res.send(error));//catch any erros 
}
*/
module.exports.bookings_post= (req,res,next) =>{
    const { bookingDate, name, email } = req.body;
  if (!bookingDate || !name || !email) {
    return res.status(400).json({
      message: 'Booking Date, Name and email are required',
    });
  }
  const payload = { bookingDate, name, email };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
}
module.exports.bookings_delete= (req,res,next) =>{
    const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
}
