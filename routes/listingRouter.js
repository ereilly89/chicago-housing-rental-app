const { Router } = require('express');
const listingController = require('../controllers/listingController')
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/listings', requireAuth, listingController.listings_get);
router.get('/listing/:id', requireAuth, listingController.listing_id_get);

module.exports = router;
