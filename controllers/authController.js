const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const passport = require('passport');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
	failureRedirect: '/users/login',
	failureFlash: 'Please Login.',
	successRedirect: '/',
	successFlash: 'You are now logged in!',
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'You have successfully logged out!');
	res.redirect('/');
};

//  PASSWORD RESET FLOW

exports.forgot = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		req.flash('error', 'No account exists with this email.');
		return res.redirect('/users/login');
	}
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user, //user => user email..
		subject: 'Password Reset',
		resetURL,
		filename: 'password-reset', // refers to which partial
	});
	req.flash('success', 'You have been emailed your password reset link. ');
	await user.save(); // allow saving of password token and password expires
	res.redirect('/users/login');
};

exports.reset = async (req, res) => {
	res.jso;
	const user = await User.findOne({
		resetPasswordToken: req.body.token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		req.flash('error', 'Password reset token invalid / expired');
		return res.login('/');
	}
	res.render('reset', { title: 'Reset Your Password' });
};

exports.confirmedPasswords = (req, res, next) => {
	if (req.body.password === req.body['confirmed-password']) {
		next();
		return;
	}
	req.flash('error', 'Passwords do not match!');
	res.redirect('/users/login');
};
