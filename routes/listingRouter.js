const { Router } = require('express');
const listingController = require('../controllers/listingController')
const { requireAuth, requireHostAuth, requireTenantAuth } = require('../middleware/authMiddleware');
const router = Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var { memoryStorage } = require('multer');


const m = multer({
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

/*var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});*/
 
//var upload = multer({ storage: storage });

router.get('/listings', requireAuth, listingController.listings_get);
router.get('/listing/create', requireHostAuth, listingController.listing_create_get);
router.post('/listing/create', m.single("file"), listingController.listing_create_post);
router.get("/listing/:id/image", listingController.listing_image_get);
router.get('/listing/:id', requireAuth, listingController.listing_id_get);
router.delete('/listing/:id', requireHostAuth, listingController.listing_id_delete);

module.exports = router;
