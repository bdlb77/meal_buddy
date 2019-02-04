const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
// Do work here
router.get('/homepage', eventController.homePage);
router.get('/events', eventController.getEvents);
module.exports = router;
