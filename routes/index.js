var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const indexController = require('../controllers/indexController');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

/* GET home page. */
router.get('/', requireAuth, indexController.index_get);

module.exports = router;
