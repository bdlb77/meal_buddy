const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

exports.createBooking = async (req, res) => {
	req.body.booker = req.user._id;
	req.body.event = req.params.id;
	const bookings = await Booking.aggregate([
		{
			$lookup: {
				from: 'events',
				localField: '_id',
				foreignField: 'event',
				as: 'events',
			},
		},
		{ $match: { 'events.1': { exists: true } } },
	]);
	console.log(`BOOKINGS:: ${bookings}`);
	if (bookings[bookings.length - 1] > 0) {
		console.log;
		req.flash('error', 'You have already booked this Event!');
		res.redirect('back');
	}
	const newBooking = new Booking(req.body);
	await newBooking.save();
	req.flash('success', `Booked for ${req.body.amount} people`);
	res.redirect('back');
};
