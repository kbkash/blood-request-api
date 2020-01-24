const express = require('express')

const router = express.Router();

const bloodStatusController = require('../controllers/bloodStatusController');
const tokenValidation = require('../utils/tokenValidation').validateToken;
const authorizeUser = require('../utils/authorizeUser').restrictTo;

//Route to get all the tracked blood for a specific blood bank
router.route('').get(tokenValidation, authorizeUser('blood-bank'), bloodStatusController.getAllTrackedBloods)
    //Route to post a new blood to track
router.route('').post(tokenValidation, authorizeUser('blood-bank'), bloodStatusController.trackNewBlood);
    //Route to update a blood status
router.route('').put(tokenValidation, authorizeUser('blood-bank'), bloodStatusController.updateBloodStatus);
    
//Route to get the blood status of a general user
router.route('/myBlood').get(tokenValidation, authorizeUser('general'), bloodStatusController.getBloodStatus);


module.exports = router;