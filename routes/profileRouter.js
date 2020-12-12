const { Router } = require('express');
const profileController = require('../controllers/profileController')
const { requireAuth, requireHostAuth, requireTenantAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/profile/tenant/:tenant_id', requireAuth, profileController.profile_tenant_get);
router.get('/profile/tenant/:tenant_id/edit_profile', requireAuth, profileController.profile_tenant_edit_get);
router.get('/profile/host/:host_id', requireAuth, profileController.profile_host_get);
router.get('/profile/host/:host_id/listings', requireHostAuth, profileController.profile_host_listings_get);
router.get('/profile/host/:host_id/bookings', requireHostAuth, profileController.profile_host_bookings_get);
router.get('/profile/host/:host_id/edit_profile', requireHostAuth, profileController.profile_host_profile_edit_get);
module.exports = router;
