const { Router } = require('express');
const bookingController = require('../controllers/bookingController')
const { requireAuth, requireTenantAuth, requireHostAuth } = require('../middleware/authMiddleware');
const router = Router();

//router.get('/schedule', requireAuth, scheduleController.schedule_get);
router.get('/booking/:listing_id', requireTenantAuth, bookingController.booking_listing_get);
router.post('/booking', requireAuth, bookingController.booking_post);
router.delete('/booking', requireAuth, bookingController.booking_delete);


module.exports = router;