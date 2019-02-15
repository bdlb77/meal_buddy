const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const passport = require('passport');
const crypto = require('crypto');

exports.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Please Login.',
    successRedirect: '/events',
    successFlash: 'You are now logged in!'
})


