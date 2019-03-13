const mongoose = require('mongoose');
const Event = mongoose.model('Event');

// middleware functions

const confirmOwner = (event, user) => {
	if (!event.author.equals(user._id)) {
		throw Error('You must be the host of the event to edit it!');
	}
};

// Routes
exports.homePage = (req, res) => {
	res.render('homepage');
};

exports.getEvents = async (req, res) => {
	const events = await Event.find();

	res.render('events/events', { title: 'Events Page', events });
};

exports.getSingleEvent = async (req, res, next) => {
	const event = await Event.findOne({ slug: req.params.slug });
	if (!Event) return next();

	res.render('events/event', { event, title: event.title });
};

exports.editSingleEvent = async (req, res) => {
	const event = await Event.findOne({ _id: req.params.id });
	// confirmOwner(event, req.user);

	res.render('events/editEvent', { event, title: `Edit ${event.title}` });
};

exports.updateEvent = async (req, res) => {
	//  Find store by ID and save ID Model.findOneAndUpdate(query, data, options)
	// set data  location to be point (search in proximity)
	req.body.location.type = 'Point';
	const event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, // return store that was just updated
		runValidators: true,
	}).exec();
	req.flash(
		'success',
		`Successfully updated <strong>${event.title}</strong><a href="/events/${event.slug}">View Store! →</a> `
	);
	res.redirect(`/event/${event._id}/edit`);
};

exports.getMap = async (req, res) => {
	const event = await Event.findOne({ _id: req.params.id });

	res.render('map', { title: 'Map' });
};
