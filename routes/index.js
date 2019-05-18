// EXTERNAL
const express = require('express');
const router = express.Router();
// INTERNAL
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
// EVENTS
router.get('/', catchErrors(eventController.getEvents));

router.get('/homepage', eventController.homePage);

router.get('/events', catchErrors(eventController.getEvents));

router.get('/event/:slug', catchErrors(eventController.getSingleEvent));

router.get('/events/add', authController.isLoggedIn, eventController.addEvent);

router.get('/event/:id/edit', catchErrors(eventController.editSingleEvent));

router.post(
	'/add',
	eventController.upload,
	catchErrors(eventController.resize),
	catchErrors(eventController.createEvent)
);
router.post(
	'/add/:id',
	eventController.upload,
	catchErrors(eventController.resize),
	catchErrors(eventController.updateEvent)
);

router.get('/event/:id/map', catchErrors(eventController.getMap));

// BOOKING
router.post('/bookings/:id', authController.isLoggedIn, catchErrors(bookingController.createBooking));

router.get('/booking/:id', authController.isLoggedIn, catchErrors(bookingController.getSingleBooking));

// REVIEW
router.post('/reviews/:id', catchErrors(reviewController.createReview));
// PROFILE DASHBOARD
// router.get('/profile/:id', catchErrors(userController.profile));
router.get('/dashboard/:id', authController.isLoggedIn, catchErrors(userController.dashboard));

// AUTHENTICATION / USERS

router.get('/users/login', userController.loginForm);

router.post('/users/login', authController.login);

router.get('/users/register', userController.registerForm);

router.post('/users/register', userController.validateRegister, userController.register, authController.login);

router.get('/users/logout', authController.logout);

router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', catchErrors(authController.reset));

router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));
module.exports = router;
