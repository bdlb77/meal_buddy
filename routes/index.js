const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/homepage', eventController.homePage);

router.get('/events', catchErrors(eventController.getEvents));

module.exports = router;
