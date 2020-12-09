const { Router } = require('express');
const reviewController = require('../controllers/reviewController')
const { requireAuth, requireHostAuth, requireTenantAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/review', requireAuth, reviewController.review_get);
router.post('/review', requireTenantAuth, reviewController.review_post);

module.exports = router;
