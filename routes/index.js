// EXTERNAL
const express = require('express');
const router = express.Router();
// INTERNAL
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
// EVENTS
router.get('/', catchErrors(eventController.getEvents));

router.get('/homepage', eventController.homePage);

router.get('/events', catchErrors(eventController.getEvents));

router.get('/event/:slug', catchErrors(eventController.getSingleEvent));

router.get('/event/:id/edit', catchErrors(eventController.editSingleEvent));

router.post('/add/:id', catchErrors(eventController.updateEvent));

// AUTHENTICATION / USERS

router.get('/users/login', userController.loginForm);

router.post('/users/login', authController.login);

router.get('/users/logout', authController.logout);

router.get('/users/register', userController.registerForm);

router.post('/users/register', 
    userController.validateRegister,
    userController.register,
    authController.login
);

module.exports = router;

