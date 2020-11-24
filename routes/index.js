var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('signin', { page: 'Sign In'})
   //res.render('', { page: 'Home' , title:'home' });

});

module.exports = router;
