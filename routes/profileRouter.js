const { Router } = require('express');
const profileController = require('../controllers/profileController')
const { requireAuth, requireHostAuth, requireTenantAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/profile/host/:host_id/listings', requireHostAuth, profileController.profile_host_listings_get);
router.get('/profile/host/:host_id/bookings', requireHostAuth, profileController.profile_host_bookings_get);
router.get('/profile/tenant/:tenant_id/bookings', requireTenantAuth, profileController.profile_tenant_bookings_get);
router.get('/profile/tenant/:tenant_id/booking/:booking_id', requireTenantAuth, profileController.profile_tenant_booking_get);
router.get('/profile/tenant/:tenant_id', requireAuth, profileController.profile_tenant_get);
router.get('/profile/host/:host_id', requireAuth, profileController.profile_host_get);


module.exports = router;
