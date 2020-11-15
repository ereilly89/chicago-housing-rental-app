var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

router.get('/:hostID', (req, res) => {
     const hostID = req.params.hostID;
     MongoClient.connect(url, function(err, dbs) {
       if (err) throw err;
       const dbo = dbs.db("RentalDB");

   	   // Obtain a list of subjects(
       const coursesResource = dbo.collection("Host").find({host_id: hostID});
       
       // SubjectResource points to documents in the database. We need to use  the  toArray() method to convert the
       // query result into an array
       coursesResource.toArray( (err, courseList) => {
           if (err) throw err;
           console.log(courseList);
           res.render('host', {hostArray: courseList, page: 'Host Profile'});
           dbs.close();
       });
    });
});

module.exports = router;
