const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Review = mongoose.model('Review');

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
	const host = event.author.populate('reviews');
	const reviews = await Review.find({ host: event.author }).populate({
		path: 'booking',
		select: 'event _id',
		populate: { path: 'event', select: 'title' },
	});
	if (!event) return next();
	const attend = await Event.attending(event._id);
	let attending;
	attend.length > 0 ? (attending = attend[0].sum) : (attending = 0);
	res.render('events/event', { event, title: event.title, attending, host, reviews });
};

exports.editSingleEvent = async (req, res) => {
	const event = await Event.findOne({ _id: req.params.id });
	// confirmOwner(event, req.user);

	res.render('events/editEvent', { event, title: `Edit ${event.title}` });
};

exports.addEvent = (req, res) => {
	console.log('hello');
	res.render('events/editEvent', { title: 'Add Event' });
};

exports.createEvent = async (req, res) => {
	req.body.author = req.user._id;
	const event = await new Event(req.body).save();
	req.flash('success', `You have successfully created ${event.title}.`);
	res.redirect(`/event/${event.slug}`);
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
	res.render('map', { title: 'Map', event });
};
