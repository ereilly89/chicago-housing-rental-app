var express = require('express');
var router = express.Router();
const aboutController = require('../controllers/aboutController')

/* GET home page. */
router.get('/about', aboutController.about_get);

module.exports = router;
