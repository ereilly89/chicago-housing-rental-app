const { Router } = require('express');
const profileController = require('../controllers/profileController')
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/profile/tenant/:tenant_id', requireAuth, profileController.profile_tenant_get);
router.get('/profile/host/:host_id', requireAuth, profileController.profile_host_get);

module.exports = router;
