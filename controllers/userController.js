const mongoose = require('mongoose');
const User = mongoose.model('User');
const Booking = mongoose.model('Booking');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
	res.render('users/login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
	res.render('users/register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
	// sanitize inputs for mongoDB
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a name.').notEmpty();
	req.checkBody('email', 'You must supply a email.').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		remove_gmail_subaddress: false,
	});
	req.checkBody('password', 'Please supply a password').notEmpty();
	req.checkBody('password-confirm', 'Password confirm must not be empty!').notEmpty();
	req.checkBody('password-confirm', 'Passwords do not match!').equals(req.body.password);

	// handle errors
	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('users/register', { title: 'Regiser', body: req.body, flashes: req.flash() });
		return;
	}
	next();
};

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	// promisify to allow promises with passport middleware. #register from passport
	// User.register (register user), user (pass along password from req as well for user)
	const registerWithPromise = promisify(User.register, User);
	await registerWithPromise(user, req.body.password);
	next();
};

exports.profile = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id });

	const bookings = [...user.bookings].map(b => {
		if (b.event.date <= Date.now()) return b;
	});
	res.render('users/profile', { title: `Profile of ${user.name}`, user, bookings });
};
