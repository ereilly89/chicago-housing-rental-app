var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, dbs) {
    if (err) throw err;
    const dbo = dbs.db("uwwDB");

	// Obtain a list of subjects
    const coursesResource = dbo.collection("courses").find();

	// SubjectResource points to documents in the database. We need to use  the  toArray() method to convert the
	// query result into an array
	coursesResource.toArray( (err, courseList) => {
        if (err) throw err;
		console.log(courseList);
		res.render('courses', {coursesArray: courseList, page: 'List of Courses'});
		dbs.close();
    });
 });
});

router.get('/:subject', (req, res) => {
     subject = req.params.subject;
     MongoClient.connect(url, function(err, dbs) {
       if (err) throw err;
       const dbo = dbs.db("uwwDB");

   	// Obtain a list of subjects
       const coursesResource = dbo.collection("courses").find({subject: subject});

   	// SubjectResource points to documents in the database. We need to use  the  toArray() method to convert the
   	// query result into an array
       	coursesResource.toArray( (err, courseList) => {
            if (err) throw err;
       		console.log(courseList);
       		res.render('courses', {coursesArray: courseList, page: 'List of Courses'});
       		dbs.close();
        });
    });
});
module.exports = router;
