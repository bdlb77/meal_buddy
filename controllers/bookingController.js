const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const Event = mongoose.model('Event');
const Review = mongoose.model('Review');
const ObjectId = mongoose.Types.ObjectId;

exports.createBooking = async (req, res) => {
	req.body.booker = req.user._id;
	req.body.event = req.params.id;
	// IGNORE CONFIRMATION FOR NOW
	req.body.confirmed = true;

	const amount = req.body.amount;
	const bookings = await Booking.aggregate([
		{
			$match: {
				event: ObjectId(req.body.event),
				booker: ObjectId(req.body.booker),
			},
		},
	]);
	if (bookings.length > 0) {
		req.flash('error', 'You have already booked this Event!');
		res.redirect('back');
		return;
	}
	const event = Event.find({ _id: req.body.event });
	const spotsOpen = event.maxCapacity - event.minCapacity;

	if (spotsOpen == 0) {
		req.flash('error', 'There are no more spots available');
		return res.redirect('back');
	} else if (amount > spotsOpen) {
		req.flash('error', 'Not enough spots open!');
		return res.redirect('back');
	}
	const newBooking = new Booking(req.body);
	await newBooking.save();
	req.flash('success', `Booked for ${req.body.amount} people`);
	res.redirect('back');
};

exports.getSingleBooking = async (req, res) => {
	const booking = await Booking.findOne({ _id: req.params.id });
	const review = await Review.findOne({ booking: booking._id, author: req.user._id });
	if (!req.user._id.equals(booking.booker)) {
		req.flash('error', `Sorry, you cannot access this page.`);
		res.redirect('back');
	}
	return res.render('bookings/booking', { title: 'Bookings', booking, review });
};
