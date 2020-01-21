const express = require('express')

const router = express.Router();

const requestController = require('../controllers/requestController');
const tokenValidation = require('../utils/tokenValidation').validateToken;
const authorizeUser = require('../utils/authorizeUser').restrictTo;

//Route for creating a new request
router.route('').post(requestController.postRequest)
//Route for getting request based on the user's blood group
    .get(tokenValidation, authorizeUser('general'), requestController.getRequest);

//Route for saving the user as a acceptor to the request
router.route('/accept').put(tokenValidation, authorizeUser('general'), requestController.acceptRequest)

module.exports = router;