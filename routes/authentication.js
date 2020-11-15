var express = require('express');
var router = express.Router();

router.get('/loginRequest', function (req, res) {
     var username = req.param("username");

     db.collection('authorizedUsers').findOne(username: username}, function(err, items) {
         if(err) {
             return console.log('findOne error:', err);
         }
         else {
           res.json(items);
         }
     });
 });
module.exports = router;
