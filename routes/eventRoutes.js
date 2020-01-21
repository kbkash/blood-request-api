const express = require('express')

const router = express.Router();

const eventController = require('../controllers/eventController');
const tokenValidation = require('../utils/tokenValidation').validateToken;
const authorizeUser = require('../utils/authorizeUser').restrictTo;

//Route for blood bank to add new event
//Date in req.body needs to be in YYYY-MM-DD formate and time needs to be in HH:MM:SS 24 hour formate
router.route('').post(tokenValidation, authorizeUser('blood-bank'), eventController.addEvent)
    //Route to get all the events
    .get(tokenValidation, eventController.getAllEvents);

//Route to get all the interested donors for a particular event
router.route('/interested/:id').get(tokenValidation, authorizeUser('blood-bank'), eventController.getInterestedDonors)

//Route to get all the events the user has registered
router.route('/my_events').get(tokenValidation, authorizeUser('blood-bank'), eventController.getMyEvents);

//Route to get the event which a general user has accepted to go to
router.route('/accepted').get(tokenValidation, authorizeUser('general'), eventController.getAcceptedEvent)

//Route for a general user to accept to go to an event
router.route('/accept').put(tokenValidation, authorizeUser('general'), eventController.acceptEvent)

//Route for a general user to reject to go to an event
router.route('/reject').put(tokenValidation, authorizeUser('general'),eventController.rejectEvent)

module.exports = router;