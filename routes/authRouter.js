const { Router } = require('express');
const authController = require('../controllers/authController')
const router = Router();

router.get('/tenant/signup', authController.tenant_signup_get);
router.get('/host/signup', authController.host_signup_get);
router.get('/signin', authController.signin_get);
router.post('/tenant/signup', authController.tenant_signup_post);
router.post('/host/signup', authController.host_signup_post);
router.post('/tenant/signin', authController.tenant_signin_post);
router.post('/host/signin', authController.host_signin_post);
router.get('/signout', authController.signout_get);

module.exports = router;
