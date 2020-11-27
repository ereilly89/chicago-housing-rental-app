var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', requireAuth, indexController.index_get);

module.exports = router;
