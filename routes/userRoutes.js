const express = require('express')

const router = express.Router();

const authController = require('../controllers/authController');
const tokenValidation = require('../utils/tokenValidation').validateToken;

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser);
router.route('').put(tokenValidation, authController.updateUser)
router.route('/blood_banks').get(authController.getBloodBanks)
router.route('').get(tokenValidation, authController.getUser);


module.exports = router;