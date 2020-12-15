const { Router } = require('express');
const reviewController = require('../controllers/reviewController')
const { requireAuth, requireHostAuth, requireTenantAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/review/tenant/:tenant_id/listing/:listing_id', reviewController.review_listing_get);
router.post('/review/tenant/:tenant_id/listing/:listing_id', reviewController.review_listing_post);


module.exports = router;
