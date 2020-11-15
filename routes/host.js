var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

router.get('/:host_id', (req, res) => {
     var host_id = Number(req.params.host_id);
     MongoClient.connect(url, function(err, dbs) {
       if (err) throw err;
       const dbo = dbs.db("RentalDB");

   	   // Obtain a list of subjects
       const host = dbo.collection("Host").find({host_id: host_id});

       	// SubjectResource points to documents in the database. We need to use  the  toArray() method to convert the
       	// query result into an array
       	host.toArray( (err, theHost) => {
            if (err) throw err;
            res.render('host', {hostArray: theHost, page: 'Host Profile'});
        });
    });
});

module.exports = router;
