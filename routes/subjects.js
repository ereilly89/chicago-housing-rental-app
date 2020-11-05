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
    const subjectsResource = dbo.collection("subjects").find().sort({name:1});

	// SubjectResource points to documents in the database. We need to use  the  toArray() method to convert the
	// query result into an array
	subjectsResource.toArray( (err, subjectList) => {
        if (err) throw err;
		console.log(subjectList);
		res.render('subjects', {subjectsArray: subjectList, page: 'List of Subjects'});
		dbs.close();
    });
 });
});
module.exports = router;
