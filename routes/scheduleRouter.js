const { Router } = require('express');
const scheduleController = require('../controllers/scheduleController')
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();
router.get('/schedule', requireAuth, scheduleController.schedule_get);
router.post('/schedule', requireAuth, scheduleController.bookings_post);
router.delete('/bookings', requireAuth, scheduleController.bookings_delete);


module.exports = router;